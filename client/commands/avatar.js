
module.exports = {
	name: 'avatar', // اسم الامر
	description: "your/other avatar", // شرح الامر
	cooldown: 1, // الكول داون بـ الثواني
	execute: async function(db,bot ,msg , args) {
if(!args[0]){
return bot.createMessage(msg.channel.id, {embed: {
title: msg.author.username + "#" + msg.author.discriminator,
image:{
url: msg.author.avatarURL
},
timestamp: new Date(),
	footer: {
		text: 'GroupBot Canary',
}
}})
}
let user = msg.mentions[0]
if(!user) {
let able = true
bot.getRESTUser(args[0]).catch(err=>{
able = false
}).then(async users =>{
if(able === false) return bot.createMessage(msg.channel.id, `User No Have Profile`);
 return bot.createMessage(msg.channel.id, {embed: {
title: users.username + "#" + users.discriminator,
image:{
url: users.avatarURL
},
timestamp: new Date(),
	footer: {
		text: 'GroupBot Canary',
}
}})
})
}else{
if(user.id === msg.author.id) return bot.createMessage(msg.channel.id, {embed: {
title: msg.author.username + "#" + msg.author.discriminator,
image:{
url: msg.author.avatarURL
},
timestamp: new Date(),
	footer: {
		text: 'GroupBot Canary',
}
}})

return bot.createMessage(msg.channel.id, {embed: {
title: user.username + "#" + user.discriminator,
image:{
url: user.avatarURL
},
timestamp: new Date(),
	footer: {
		text: 'GroupBot Canary',
}
}})
}
	},
};
