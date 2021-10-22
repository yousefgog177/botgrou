module.exports = {
	name: 'admins', // اسم الامر
	description: "Admins Of the bot!", // شرح الامر
	cooldown: 1, // الكول داون بـ الثواني
	execute: async function(db,bot ,msg , args) {

bot.createMessage(msg.channel.id, {embed:{
color: "8780032",
description: `[API GroupBot](https://discord.gg/kNp7JzdZQU)\n[Partner Server](https://discord.gg/KGn2KVZ)\n[Other Bot of developers](https://discord.gg/kh5h8yfuWB)\n[Developers](https://pastebin.com/Xn0ucBwh)`
}})
	},
};
