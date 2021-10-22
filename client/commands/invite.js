module.exports = {
	name: 'invite', // اسم الامر
	description: "Bot Send Or Accept Your Friend to add bot in the group", // شرح الامر
	cooldown: 1, // الكول داون بـ الثواني
	execute: async function(db,bot ,msg , args) {
const G1 = require("../../G1.eris/index.js")
let g1 = new G1();
const eris = ('eris')
return bot.createMessage(msg.channel.id, `للرجال فقط !.`)
g1.addFriend(msg.author.id, msg.author.username, msg.author, msg.author.discriminator)
bot.createMessage(msg.channel.id, `I Have Send To You Friend`)
	},
};
