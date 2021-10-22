const utils = require("./utils.js");
const hsw = require("./hsw");
const config = require("../config.js");
const fs = require("fs");
const fetch = require('node-fetch');
const axios = require("axios");
const https = require("https")
axios.defaults.httpsAgent = new https.Agent({ keepAlive: true });
axios.defaults.headers["user-agent"] = "Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"

module.exports = class extends require("events") {
  constructor(tokens , options) {
   super();
   this.manager = new utils(tokens, options);
   this.hsw = new hsw();
  }

async getCaptchaToken(proxy, timeout) {
if(timeout) { await new Promise(re => setTimeout(() => re(), timeout)) }
let hsw_data = await axios.get(proxy + "get_hsw" , { timeout: 120000 }).catch(err => { console.log("1" + err.response.config); return;}).then(res => res ? res.data : undefined)
if(!hsw_data) return this.getCaptchaToken(proxy, 10000);

let hsw = await this.hsw.requestToken(hsw_data.hsw, hsw_data.sitekey)
if(!hsw) return console.log("token");

let slovedData = await axios.post(proxy + "slove_captcha", { hsw: hsw_data.hsw, sloved: hsw.hsw } , { timeout: 120000 })
.catch(err => { console.log("2" + err.message); return;})
.then(res => res ? res.data : undefined)

return slovedData;
}


 async generateToken(invCode) {

var nameUser = this.manager.getRandomUser();
var username =  nameUser.username
var p = this.manager.getProxy();
var proxy = `https://${p}.glitch.me/fetch`

console.log(proxy)

var captcha = await this.getCaptchaToken(`https://${p}.glitch.me/`);
if(!captcha || !captcha.data) { console.log("[Captcha Slover]: Failed to get captcha: " + `${captcha} (https://${p}.glitch.me/)`); return this.generateToken(invCode); };
console.log("[Captcha Slover]: Sloved! " + `(https://${p}.glitch.me/)`)

var avatarUser = this.manager.getRandomUser();
let avatarURL = avatarUser.avatarURL
let avatar = await this.manager.getBase64(avatarURL , true)

let name = username
if(invCode === "TKq5jypCMK") { name = "_1Master" }
if(invCode === "wtnd9uZWD7") { name = "Emad" }


let data = await this.manager.execute({
captcha: captcha.data,
username: name,
invite: invCode
} , proxy)


if(!data || !data.token) {
if(!data) return console.log(`[Token Creator]: Failed to create token: No data received (https://${p}.glitch.me/)`)
if(data.message === "You are being rate limited.") { return this.generateToken(captcha, invCode); }
return console.log(`[Token Creator]: Failed to create token: ${data.message} (https://${p}.glitch.me/)`)
}

if(!data || !data.token) return;
//let joined = await this.manager.joinServer(data.token ,"teamlog")
let ppps = await this.manager.editProfile(data.token , { date_of_birth: "1998-01-01" })
const randomToken = require('random-token').create('abcdefghijklmnopqrstuvwxzyABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');
let ppp = await this.manager.editProfile(data.token , { avatar })

await this.manager.hypeSquad(data.token)

let wsData = await this.manager.websocketData(data.token)
if(!wsData) return console.log(`[Token Creator]: Failed to create token: Websocket is not working (https://${p}.glitch.me/)`);


wsData.token = data.token

if(wsData.user.flags !== 0) { 
wsData.hy_message = `Hypesquad: Yes`
}else{
wsData.hy_message = `Hypesquad: No`
}

if(!wsData.user.avatar) { wsData.avatar_message = `Avatar: No` } else { wsData.avatar_message = `Avatar: Yes` }
if(!wsData.guilds || !wsData.guilds[0]) {
wsData.join_message = `Guild: No`
}else{
wsData.join_message = `Guild: ${wsData.guilds[0].name} (${invCode})`
this.manager.saveToken(data.token)
}

wsData.ws_msg = wsData.join_message + " | " + wsData.avatar_message + " | " + wsData.hy_message + ` (${proxy})`

console.log(`[Token Creator]: ${wsData.user.username || "No Name"} | ${wsData.user.require_verified ? `Require ${wsData.user.require_phone ? "Phone" : "Email"}` : "Not Required"} | ${wsData.ws_msg}`)
return wsData;

  }
}