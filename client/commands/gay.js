module.exports = {
	name: 'gay', // اسم الامر
	description: "Percentage of gay for you or other", // شرح الامر
	cooldown: 5, // الكول داون بـ الثواني
	execute: async function(db,bot ,msg , args) {
const fetch = require('node-fetch');

   var three = Math.floor(Math.random() * 100) + 0;
if(!args[0]) args[0] = msg.author.id
let user = msg.mentions[0]
if(!user) {
bot.getRESTUser(args[0]).then(users =>{
if(!users) return bot.createMessage(msg.channel.id, `I Can't find user`)
fetch(('https://unequaled-bedecked-animantarx.glitch.me/api/user') , {method: 'post', body: JSON.stringify({"id": users.id}), headers: { 'authorization': "GROUP", 'Content-Type': 'application/json' }, referrerPolicy: "no-referrer"}).then(async ress =>{
  let json = await ress.json();
if(json.gay === null) {
fetch(('https://unequaled-bedecked-animantarx.glitch.me/api/add/gay') , {method: 'post', body: JSON.stringify({"id": users.id}), headers: { 'authorization': "GROUP", 'Content-Type': 'application/json' }, referrerPolicy: "no-referrer"}).then(async ressa =>{
  let jsons = await ressa.json();
if(users.id === msg.author.id) return bot.createMessage(msg.channel.id, `Your Gay: ${jsons.gay}`)
return bot.createMessage(msg.channel.id, `${users.username} Gay: ${jsons.gay}`)
})
}else{
if(users.id === msg.author.id) return bot.createMessage(msg.channel.id, `Your Gay: ${json.gay}`)
return bot.createMessage(msg.channel.id, `${users.username} Gay: ${json.gay}`)
}
})
}).catch(err => {
return bot.createMessage(msg.channel.id, `I can't find user`)
})
}else{
fetch(('https://unequaled-bedecked-animantarx.glitch.me/api/user') , {method: 'post', body: JSON.stringify({"id": user.id}), headers: { 'authorization': "GROUP", 'Content-Type': 'application/json' }, referrerPolicy: "no-referrer"}).then(async ress =>{
  let json = await ress.json();
if(json.gay === null) {
fetch(('https://unequaled-bedecked-animantarx.glitch.me/api/add/gay') , {method: 'post', body: JSON.stringify({"id": user.id}), headers: { 'authorization': "GROUP", 'Content-Type': 'application/json' }, referrerPolicy: "no-referrer"}).then(async ressa =>{
  let jsons = await ressa.json();
if(user.id === msg.author.id) return bot.createMessage(msg.channel.id, `Your Gay: ${jsons.gay}`)
return bot.createMessage(msg.channel.id, `${user.username} Gay: ${jsons.gay}`)
})
}else{
if(user.id === msg.author.id) return bot.createMessage(msg.channel.id, `Your Gay: ${json.gay}`)
return bot.createMessage(msg.channel.id, `${user.username} Gay: ${json.gay}`)
}
})
}
	},
};
