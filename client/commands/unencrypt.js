module.exports = {
	name: 'unencrypt', // اسم الامر
	description: "unencrypt Of message!", // شرح الامر
	cooldown: 1, // الكول داون بـ الثواني
	execute: async function(db,bot ,msg , args) {
if(!args[0]) return bot.createMessage(msg.channel.id, `NO Args!`)
const fetch = require('node-fetch');
const fs = require('fs');
const con2 = JSON.parse(fs.readFileSync("./data/config2.json", "utf8"))
if(!con2["developer"].includes(msg.author.id)) return bot.createMessage(msg.channel.id, `Only Admin's or donation's`)
if(args[0].length < 4) return bot.createMessage(msg.channel.id, `Less 4!`)
fetch(('https://unequaled-bedecked-animantarx.glitch.me/api/untest/') , {method: 'post', body: JSON.stringify({"message": args.slice(0).join(" ")}), headers: { 'authorization': "GROUP", 'Content-Type': 'application/json' }, referrerPolicy: "no-referrer"}).then(async ress =>{
  let json = await ress.json();

bot.createMessage(msg.channel.id, `${json.message}`)

})
	},
};
