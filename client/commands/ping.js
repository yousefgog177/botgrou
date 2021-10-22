module.exports = {
	name: 'ping', // اسم الامر
	description: "", // شرح الامر
	cooldown: 5, // الكول داون بـ الثواني
	execute: async function(db,bot ,message , args) {

db.get("premium", {"owner": message.author.id}).then(rows =>{
let db = Date.now() - message.timestamp
 bot.createMessage(message.channel.id, 'Pong...').then((msg) => {
      msg.edit(`🚀 **Pong...  -  Time taken: __${msg.timestamp - message.timestamp}__ ms.**
📚 **DateBase Ping: __${db}__ ms.** - 🤖 **Bot Ping: __${(msg.timestamp - message.timestamp) - db}__ ms.**`);
 })
})

	},
};
