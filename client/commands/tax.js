module.exports = {
	name: 'tax', // اسم الامر
	description: "Tax Of credits!", // شرح الامر
	cooldown: 1, // الكول داون بـ الثواني
	execute: async function(db,bot ,msg , args) {

var message = msg
var nobalance = {description: "**‏:x: Only Number’s.**", color: "16318464"}
let ar = message.content.split(" ")
if(!ar)  return bot.createMessage(msg.channel.id, nobalance.description).catch(err =>{})
let a = 0
    for(var i = 0; i < 10; i++){
if(message.content.split(" ")[i] && message.content.split(" ")[i].length > 0) {
a++
args[a] = message.content.split(" ")[i]
} 
    }

if(args[2] === false || !args[2] || isNaN(args[2])) return bot.createMessage(msg.channel.id, {embed:nobalance})
args[2] = Math.floor(args[2])
if(args[2] < 1) bot.createMessage(msg.channel.id, nobalance.description).catch(err =>{})
args[2] = Math.round(args[2])
var mbl5plusdr = Math.floor(((args[2] * 20) / 19) + 1)
var wadr = Math.floor(((mbl5plusdr * 20) / 19) + 1) 
var done = {
"description": `> **The Final Price : ${mbl5plusdr}**\n> **The Final Price With Mediator : ${wadr}**`,
 color: "8780032",
"title": "**حساب ضريبة بروبوت**",
thumbnail: {
        url: message.author.avatarURL,
    }}
bot.createMessage(msg.channel.id, {embed:done})

	},
};
