module.exports = {
	name: 'yesorno', // اسم الامر
	description: "this command will answer your question, yes or no", // شرح الامر
	cooldown: 1, // الكول داون بـ الثواني
	execute: async function(db,bot ,msg , args) {

const G1 = require("../../G1.eris/index.js")
let g1 = new G1();
let color = '0xffffff'
if(!args[0]) return bot.createMessage(msg.channel.id, `i can't find question`)
const superagent = require('superagent')
var argss = args.join(' ')
      const { body } = await superagent
    .get('https://yesno.wtf/api/');
    if(body.answer === 'yes') color = 'green';
    if(body.answer === 'no') color = 'red';
    bot.createMessage(msg.channel.id, {embed: {
title: `${argss} Has ${body.answer}`,
image:{
"url": body.image
}
}})
	},
};
