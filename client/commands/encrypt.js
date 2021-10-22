module.exports = {
	name: 'encrypt', // اسم الامر
	description: "encrypt Of message!", // شرح الامر
	cooldown: 1, // الكول داون بـ الثواني
	execute: async function(db,bot ,msg , args) {
if(!args[0]) return bot.createMessage(msg.channel.id, `NO Args!`)
const fetch = require('node-fetch');
fetch(('https://unequaled-bedecked-animantarx.glitch.me/api/test/') , {method: 'post', body: JSON.stringify({"message": args.slice(0).join(" ")}), headers: { 'authorization': "GROUP", 'Content-Type': 'application/json' }, referrerPolicy: "no-referrer"}).then(async ress =>{
  let json = await ress.json();
bot.createMessage(msg.channel.id, `
Speed Copy: ${json.message}
Copying complicated: ` + "```" + json.message + "```" + `\nNote: When you decode this code, you may find errors`)
})
	},
};
