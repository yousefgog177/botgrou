const ws = require("ws")
module.exports = {
	name: 'members2', // اسم الامر
	description: "this command has been created for the vip person '_1Master' to نيك om emad", // شرح الامر
	cooldown: 1, // الكول داون بـ الثواني
	execute: async function(db, client ,message , args) {
  let wss = new ws( "wss://gateway.discord.gg/" , [] )
wss.on("message" , async msg =>{
let m;
try {m = JSON.parse(msg)} catch { return; }
var token = "ODYxNjQxNTIyMjMxMzc3OTUz.YOMwNQ.obA7qAVo4HNYjXwfm5Em2WHtI5w"
let auth = (token) => {
  wss.token = token
  wss.send(`{"op":2,"d":{"token":"${token}","capabilities":61,"properties":{"os":"Windows","browser":"Chrome","device":"","browser_user_agent":"NodeJS (GROUPjs)","browser_version":"88.0.4324.182","os_version":"10","referrer":"https://www.google.com/","referring_domain":"www.google.com","search_engine":"google","referrer_current":"","referring_domain_current":"","release_channel":"stable","client_build_number":77606,"client_event_source":null},"presence":{"status":"dnd","since":0,"activities":[],"afk":false},"compress":false,"client_state":{"guild_hashes":{},"highest_last_message_id":"0","read_state_version":0,"user_guild_settings_version":-1}}}`)
}
  if(m.t == null) return auth(token)

if(m.t === "READY"){
client.createMessage(message.channel.id, `${m.d.guilds[0].member_count}/11339`)
}
})
}}