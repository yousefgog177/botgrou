module.exports = {
	name: 'setprefix', // اسم الامر
	description: "Set Prefix for you group!", // شرح الامر
	cooldown: 1, // الكول داون بـ الثواني
	execute: async function(db,bot ,msg , args) {
const fetch = require('node-fetch');
if(!args[0]) {
fetch(('https://unequaled-bedecked-animantarx.glitch.me/api/group') , {method: 'post', body: JSON.stringify({"id": msg.channel.id}), headers: { 'authorization': "GROUP", 'Content-Type': 'application/json' }, referrerPolicy: "no-referrer"}).then(async ress =>{
  let json = await ress.json();
 bot.createMessage(msg.channel.id, `Prefix now: ${json.prefix}`)
})
}else{
fetch(('https://unequaled-bedecked-animantarx.glitch.me/api/setprefix/') , {method: 'post', body: JSON.stringify({"groupid": msg.channel.id, "prefix": args[0]}), headers: { 'authorization': "ESazdxTze34", 'Content-Type': 'application/json' }, referrerPolicy: "no-referrer"}).then(async ress =>{
  let json = await ress.json();
 bot.createMessage(msg.channel.id, `${msg.channel.name},\n ${json.message}`)

})
}
	},
};
