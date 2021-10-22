module.exports = {
	name: 'credits', // اسم الامر
	description: "Credits for probot!", // شرح الامر
	cooldown: 20, // الكول داون بـ الثواني
	execute: async function(db,bot ,msg , args) {
const express = require("express");
const app = express();
const fetch = require("node-fetch")
if(!args[0]){
const headerss = {
"authorization": "TAzsTscbh4dc"
}
  fetch('https://groupbotapi.glitch.me/credits/' + msg.author.id, {
        method: 'GET',
        headers: headerss,
 })
    .then(res => res.json())
    .then(json => {
return bot.createMessage(msg.channel.id, `${json}`);
  })
return;
}else{
let user = msg.mentions[0]
if(!user) {
let able = true
bot.getRESTUser(args[0]).catch(err=>{
able = false
}).then(async users =>{
if(able === false) return bot.createMessage(msg.channel.id, `User No Have Profile`);
const headerss = {
"authorization": "TAzsTscbh4dc"
}
  fetch('https://groupbotapi.glitch.me/credits/' + users.id, {
        method: 'GET',
        headers: headerss,
 })
    .then(res => res.json())
    .then(json => {
console.log(json + " " + users.id)
return bot.createMessage(msg.channel.id, `${json}`);
  
})
})
return;
}else{
const headerss = {
"authorization": "TAzsTscbh4dc"
}
  fetch('https://groupbotapi.glitch.me/credits/' + user.id, {
        method: 'GET',
        headers: headerss,
 })
    .then(res => res.json())
    .then(json => {
return bot.createMessage(msg.channel.id, `${json}`);
  })
}
}
 	},
};
