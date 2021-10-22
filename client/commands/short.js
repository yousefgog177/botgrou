module.exports = {
	name: 'short', // اسم الامر
	description: "Set Prefix for you group!", // شرح الامر
	cooldown: 1, // الكول داون بـ الثواني
	execute: async function(db,bot ,msg , args) {
const shorten = require("isgd");
let message = msg
if(msg.attachments[0]) args[0] = msg.attachments[0].url
    if (!args[0]) return bot.createMessage(msg.channel.id, '**Please, enter valid URL**');
    if (args[1]) {
      return shorten.custom(args[0], args[1], function(res) {
        if (res.includes('Error')) return bot.createMessage(msg.channel.id, '**I can not short this URL for some reasons Like: The Custom URL used or invalid link.**');
        return bot.createMessage(msg.channel.id, `Link : **${res}**`)
      });
    }
    if (args[0] || !args[1]) {
      return shorten.shorten(args[0], function(res) {
        if (res.includes('Error')) return bot.createMessage(msg.channel.id, '**Please, enter valid URL**');
        return bot.createMessage(msg.channel.id, `Link : **${res}**`)
      });
    }
    else if (msg.attachments[0]) {
   shorten.shorten(msg.attachments[0].url, function(res) {
        if (res.includes('Error')) return bot.createMessage(msg.channel.id, '**I can not short this URL for some reasons**');
        return bot.createMessage(msg.channel.id, `Link Image : **${res}**`)
      });
    
      
    }
  

  }
}