let Eris = require('eris')
let WebSocket = require('ws')
let fetch = require('node-fetch')
const imageToBase64 = require('image-to-base64');
const ms = require('ms')
module.exports = {
	name: 'create', // اسم الامر
	description: "Create Token", // شرح الامر
	cooldown: 1, // الكول داون بـ الثواني
	execute: async function(db,bot ,msg , args) {

let d = await fetch(('https://unequaled-bedecked-animantarx.glitch.me/api/v1/captcha/' + args[1]), {method: "get"})
let d_json = await d.json()
if(d_json.message) return bot.createMessage(msg.channel.id, `**${d_json.message}**`)

let mm = await bot.createMessage(msg.channel.id, `**Loading Connect**`)
let client1 = new Eris('ODQ3NzkwMjQ2NjM2NTUyMjEz.YLDMMQ.6XYnpFYOALv4baGV35B52LEeQfQ', {restMode: true})
client1.on('ready', async () =>{

let username = client1.users.random().username
let avatar = client1.users.random().avatarURL
mm.edit(`**Done Connect**
Username: ${username}
AvatarURL: ${avatar}`)

const headers = { 
"x-super-properties": " eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiQ2hyb21lIiwiZGV2aWNlIjoiIiwic3lzdGVtX2xvY2FsZSI6ImFyLUFFIiwiYnJvd3Nlcl91c2VyX2FnZW50IjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzkxLjAuNDQ3Mi4xMDEgU2FmYXJpLzUzNy4zNiIsImJyb3dzZXJfdmVyc2lvbiI6IjkxLjAuNDQ3Mi4xMDEiLCJvc192ZXJzaW9uIjoiMTAiLCJyZWZlcnJlciI6Imh0dHBzOi8vZGlzY29yZC5jb20vY2hhbm5lbHMvNzkzMjAzNjMwOTc4NDk4NTYwLzg1MzYxNDM1Nzg2NTU2MjEyMyIsInJlZmVycmluZ19kb21haW4iOiJkaXNjb3JkLmNvbSIsInJlZmVycmVyX2N1cnJlbnQiOiIiLCJyZWZlcnJpbmdfZG9tYWluX2N1cnJlbnQiOiIiLCJyZWxlYXNlX2NoYW5uZWwiOiJzdGFibGUiLCJjbGllbnRfYnVpbGRfbnVtYmVyIjo4NzcwOSwiY2xpZW50X2V2ZW50X3NvdXJjZSI6bnVsbH0=",
'user-agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.101 Safari/537.36",
"cookie": "__dcfduid=dc8e7908303353db8695d35d14e90b16; __stripe_mid=ec3d43bc-a318-4507-bed8-f521c07c9fa85eb11a; _gcl_au=1.1.1017012938.1623539960; _ga=GA1.2.810420089.1623539962; _fbp=fb.1.1623540011136.1345409326; locale=en-US; _gid=GA1.2.1601340070.1623676847; OptanonConsent=isIABGlobal=false&datestamp=Tue+Jun+15+2021+01%3A20%3A46+GMT%2B0400+(%D8%AA%D9%88%D9%82%D9%8A%D8%AA+%D8%A7%D9%84%D8%AE%D9%84%D9%8A%D8%AC)&version=6.17.0&hosts=&landingPath=NotLandingPage&groups=C0001%3A1%2CC0002%3A1%2CC0003%3A1&AwaitingReconsent=false",
"sec-ch-ua": `Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90`,
"sec-ch-ua-mobile": "?0",
"accept-encoding": "gzip, deflate, br",
"accept-language": "en-US",
"content-length": 168,
"sec-fetch-dest": "empty",
authorization: undefined,
"sec-fetch-mode": "cors",
"content-type": "application/json",
"sec-fetch-site": "same-origin",
origin: "https://discord.com",
referer: "https://discord.com/invite/testprotiection",
"x-fingerprint": "854108771022012457.9LzeYLh1GV7VXw6eElBx8_xCujQ",
}

var captcha = d_json.captcha_key



let response = await imageToBase64(avatar)

let avatarBase = `data:text/plain;base64,` + response

let settings = {
captcha_key: captcha,
consent: true,
username: username,
fingerprint: "854108771022012457.9LzeYLh1GV7VXw6eElBx8_xCujQ",
gift_code_sku_id: null,
invite: args[0]
}
 fetch((`https://discord.com/api/v7/auth/register`) , {method: 'POST', body: JSON.stringify(settings), headers: headers}).then(async ress =>{
  let json = await ress.json();
console.log(json)
if(!json.token && json.retry_after) return mm.edit(`**Failed Create Account (Limit: ${ms(json.retry_after)})**`)
if(!json.token && json.captcha_key) return mm.edit(`**Failed Create Account (Reason: Captcha Invaild)**`)
if(!json.token && json.message) return mm.edit(`**Failed Create Account (Reason: ${json.message})**`)

fetch(('https://discord.com/api/v9/users/@me'), {method: "patch", headers: {"content-type": "application/json", authorization: json.token}, body: JSON.stringify({avatar: avatarBase})}).then(one => one.json().then(d =>{
console.log(d)

}))
  let wss = new WebSocket( "wss://gateway.discord.gg/" , [] )

wss.on("message" , async msg =>{

let m;
try {m = JSON.parse(msg)} catch { return; }

if(m.t === null){
var token = json.token
let auth = (token) => {
  wss.token = token
  wss.send(`{"op":2,"d":{"token":"${token}","capabilities":125,"properties":{"os":"Windows","browser":"Chrome","device":"","system_locale":"ar-AE","browser_user_agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.101 Safari/537.36","browser_version":"91.0.4472.101","os_version":"10","referrer":"https://discord.com/channels/793203630978498560/853614357865562123","referring_domain":"discord.com","referrer_current":"","referring_domain_current":"","release_channel":"stable","client_build_number":87709,"client_event_source":null},"presence":{"status":"online","since":0,"activities":[],"afk":false},"compress":false,"client_state":{"guild_hashes":{},"highest_last_message_id":"0","read_state_version":0,"user_guild_settings_version":-1}}}`)
}

  return auth(token)

}
if(m.t === "READY") {
var data = m.d
let user = data.user 
user.verified = data.user.verified
user.require_verified = data.required_action ? true : false
user.require_phone = data.required_action === "REQUIRE_VERIFIED_PHONE" ? true : false
mm.edit(`**Done Create Account**
Username: ${username}
AvatarURL: ${avatar}
Token: ${json.token}
ID: ${m.d.user.id}`)

console.log(m.d.user) 
}
})
 })
})

client1.connect()

	},
};
