module.exports = {
	name: 'enable', // اسم الامر
	description: "Enable You In Web!", // شرح الامر
	cooldown: 1, // الكول داون بـ الثواني
	execute: async function(db,bot ,msg , args) {
const fetch = require('node-fetch');
fetch(('https://unequaled-bedecked-animantarx.glitch.me/api/group') , {method: 'post', body: JSON.stringify({"id": msg.channel.id}), headers: { 'authorization': "GROUP", 'Content-Type': 'application/json' }, referrerPolicy: "no-referrer"}).then(async ress =>{
  let json = await ress.json();
if(!args[0]) return bot.createMessage(msg.channel.id, `use: ${json.prefix}enable [token]`)

fetch(('https://unequaled-bedecked-animantarx.glitch.me/api/v1/enable') , {method: 'patch', body: JSON.stringify({"token": args[0], "id": msg.author.id}), headers: { 'authorization': "YOUSUF3MK41371755", 'Content-Type': 'application/json' }, referrerPolicy: "no-referrer"}).then(async res =>{
  let jsons = await res.json();
bot.createMessage(msg.channel.id, `**${jsons.message}**`)
})

})
  }
}