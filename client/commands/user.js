module.exports = {
	name: 'user', // اسم الامر
	description: "User In Discord, Account Joined Discord Time", // شرح الامر
	cooldown: 1, // الكول داون بـ الثواني
	execute: async function(db,bot ,msg , args) {
const moment = require('moment');
const G1 = require("../../G1.eris/index.js")
let g1 = new G1();
if(!args[0]){
const heg = msg.author
return g1.user(msg.channel.id, msg.author)
}
let user = msg.mentions[0]
if(!user) {
bot.getRESTUser(args[0]).then(users =>{
if(!users) return bot.createMessage(msg.channel.id, `I Can't find user`)
if(users.id === msg.author.id) return g1.user(msg.channel.id, msg.author)
return g1.user(msg.channel.id, users)
})
}else{
let user = msg.mentions[0] || msg.author
return g1.user(msg.channel.id, user)
}
	},
};
