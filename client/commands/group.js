module.exports = {
	name: 'group', // اسم الامر
	description: "Group Create Time", // شرح الامر
	cooldown: 1, // الكول داون بـ الثواني
	execute: async function(db,bot ,msg , args) {
const moment = require("moment")
        let heg = msg.channel;
               moment.locale('en-TN');
bot.createMessage(msg.channel.id, {embed:{
"title": "Group " + msg.channel.name,
    description: `> **Create at :**\n > **${moment(heg.createdAt).format('YYYY/M/D HH:mm:ss')} | \`${moment(heg.createdAt).fromNow()}\`**`,

}})
	},
};
