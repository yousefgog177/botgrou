module.exports = {
	name: 'ms', // اسم الامر
	description: "ms time of mailsecond and delete/add Date.now()", // شرح الامر
	cooldown: 1, // الكول داون بـ الثواني
	execute: async function(db,bot ,msg , args) {
const G1 = require("../../G1.eris/index.js")
let g1 = new G1();
const eris = ('eris')
const ms = require('ms');
if(!args[0]) return bot.createMessage(msg.channel.id, `I Can't find time`)
var time = ms(args[0])
if(!time) return bot.createMessage(msg.channel.id, `I Can't find time`)
bot.createMessage(msg.channel.id, `MS: ${ms(args[0])}\nMS Date+: ${time + Date.now()}\nMS Date-: ${time - Date.now()}`)

	},
};
