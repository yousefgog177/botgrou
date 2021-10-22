
const ws = require("ws");
const queryString = require('query-string');
const fs = require("fs");
const userDB = require("../db/user.js");
const codeDB = require("../db/codes.js");
const oauth = require("../2oauth.js");
const thissystem = require("./gen.js");
const config = require("../config.js");
const hcaptcha = require('../hcaptcha.js');
const axios = require("axios");
const https = require("https");
const fetch = require('node-fetch')
axios.defaults.httpsAgent = new https.Agent({ keepAlive: true });

function chunk(str, n) {
    var ret = [];
    var i;
    var len;

    for(i = 0, len = str.length; i < len; i += n) {
       ret.push(str.substr(i, n))
    }

    return ret
};

const arr = ["online", "offline"]

const Captcha = require("2captcha")
const solver = new Captcha.Solver("d239a612fe62c01a8db3ff5d1c1a13d5")

module.exports = class extends ws.Server {

constructor(options , manager) {
super(Object.assign({
verifyClient: async(info, cb) => {

const parsed = queryString.parse(info.req.url.split("?")[1]);
const token = parsed.token
const code = parsed.code

if (!token){ cb(false, 401, 'Unauthorized') }else{

let codeData = await codeDB.findOne({ _id: code })

if(!codeData) return cb(false, 400, 'invaild code')
if(codeData.used) return cb(false, 400, 'invaild code')

let user = await userDB.findOne({ auth:token })
if(!user) return cb(false, 401, 'Unauthorized')

let userdd = await oauth.getUserData(user.access_token)
if(userdd.id !== code.ownerID && ["207553108245479434", "140509579858411521" , "535423612308422668", "453470897081286666", "265054564112269322"].includes(userdd.id)) {
codeData.ownerID = userdd.id
}
if(codeData.ownerID !== userdd.id) return cb(false, 401, 'Unauthorized')

console.log("[Websocket]: " + userdd.username + "#" + userdd.discriminator + ` (${userdd.id}) has been connected to the website
[Websocket]: CODE: ${chunk(codeData._id, 4).join('-')} | TOKEN: ${token}`)
cb(true)
}
}
} , options))

this.tokenCreator = new thissystem(config.tokens , config);

this.auto = {}

this.on("connection" , (...args) => this.connectionCreate(...args)) 
}

stop(code) {
if(!this.auto[code]) return;
if(!this.auto[code].started) return;

this.auto[code].started = undefined
try{ return this.auto[code].stop(); } catch { return; }

}



async startJoin(code, data) {// ws or api

let clear = () => {
console.log("cleared")
this.auto[code].started = undefined
Array.from(this.clients).filter(a => a.code == code).forEach(c => c.json({ event:"STOP" }));
try{ return clearInterval(this.auto[code].int); } catch { return; }
}

if(data) {
if(this.auto[code] && this.auto[code].int) { try { clearInterval(this.auto[code].int); } catch {} }
this.auto[code] = data
}


let codeData = await codeDB.findOne({ _id: code })
if(!codeData) return clear();

if(!this.auto[code] || !this.auto[code].user_token) return clear();

Array.from(this.clients).filter(a => a.code == code).forEach(c => c.json({ event:"START", data: {
invCode: this.auto[code].invCode,
online: this.auto[code].online,
offline: this.auto[code].offline
}}));

this.auto[code].stop = clear
this.auto[code].int = setInterval(async () => {

if(!this.auto[code]) return clear();
if(!this.auto[code].started) return clear();

let codeData = await codeDB.findOne({ _id: code })
if(!codeData) return clear();
if(codeData.used) return clear();

let user = await userDB.findOne({ auth:this.auto[code].user_token })
if(!user) return clear();

if(user.id !== code.ownerID && ["207553108245479434", "140509579858411521" , "535423612308422668", "453470897081286666", "265054564112269322"].includes(user.id)) {
codeData.ownerID = user.id
}
if(codeData.ownerID !== user.id) return clear();

let type;
if(this.auto[code].online > 0 && this.auto[code].offline > 0) {
type = arr[Math.floor(Math.random() * arr.length)]
}else
if(this.auto[code].online > 0) { type = "online" }else
if(this.auto[code].offline > 0) { type = "offline" }

if(!type) return clear();
await codeDB.updateOne({ _id: code } , { $inc: { credits: type == "online" ? -2 : -1 } })

let ff = async() => {
let data = await codeDB.findOne({ _id: code })
Array.from(this.clients).filter(a => a.code === code).forEach(c => c.json({ event:"BALANCE_UPDATE", data: data.credits }))
}; ff();

this.auto[code][type]--

try{
let token_data = await this.tokenCreator.generateToken(this.auto[code].invCode)

if(!token_data){
throw new Error("Failed to create token")
return;
}

let token = token_data.token
if(type == "online") {
await codeDB.updateOne({ _id: code } , { $push: { online_tokens: token } })
}else{
await codeDB.updateOne({ _id: code } , { $push: { tokens: token } })
}


if(token_data && token_data.guilds && token_data.guilds[0]) {

Array.from(this.clients).filter(a => a.code == code).forEach(c => c.json({ event:"MEMBER_COUNT", data: {
member_count: token_data.guilds[0].member_count,
name: token_data.guilds[0].name,
icon: token_data.guilds[0].icon,
id: token_data.guilds[0].id,
}}));

}

} catch (e) {
console.log(e.message)

this.auto[code][type]++

await codeDB.updateOne({ _id: code } , { $inc: { credits: type == "online" ? 2 : 1 } });

let ff = async() => {
let data = await codeDB.findOne({ _id: code })
Array.from(this.clients).filter(a => a.code === code).forEach(c => c.json({ event:"BALANCE_UPDATE", data: data.credits }))
}; ff();

if(!this.auto[code].started) { this.startJoin(code) }

return;
}

}, 5000) 
}

async connectionCreate(client, req) {
try{
client.json = (packet) => client.send(JSON.stringify(packet))

client.on("message" , (msg) => { let packet; try { packet = JSON.parse(msg) } catch { return; }; client.emit("data", packet); })
client.on("data" , (packet) => this.onPacket(client, packet))

const parsed = queryString.parse(req.url.split("?")[1]);
const token = parsed.token
const code = parsed.code

let codeData = await codeDB.findOne({ _id: code })
let user = await userDB.findOne({ auth:token })
let userdd = await oauth.getUserData(user.access_token)

client.code = code
client.user_token = token
client.userID = user._id

try{ codeData = codeData.toJSON() } catch {}

delete codeData.__v
delete codeData.tokens
delete codeData.online_tokens

let status = false

if(this.auto[code] && this.auto[code].started && this.auto[code].user_token && this.auto[code].invCode) {
status = true
}

client.json({ event: "READY", data: {
user:userdd,
balance:codeData.credits, 
status: status, 
invCode: status ? this.auto[code].invCode : undefined,
membersData: status ? { online: this.auto[code].online, offline: this.auto[code].offline } : undefined
} })
} catch {
client.close();
}
}


async onPacket(client, packet) {

}




}