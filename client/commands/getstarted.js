module.exports = {
	name: 'getstarted', // اسم الامر
	description: "GetStarted To help you for start!", // شرح الامر
	cooldown: 1, // الكول داون بـ الثواني
	execute: async function(db,bot ,msg , args) {

 bot.createMessage(msg.channel.id, `
Old verison:

- Discord.js 
- Eris 
- Ads 
- Premium 
- Calculator 

New verison:

- Deleted Discord.js
- Eris
- Ads Upgraded
- Premium Upgraded
- Calculator Upgraded
- Join Groups For Link
- Setprefix
- clan's
- credits,topcredits,topxp ProBot 
- cape
`)
	},
};
