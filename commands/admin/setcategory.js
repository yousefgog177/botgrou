let codes = require('../../db/codes.js')
const randomToken = require('random-token').create('abcdefghijklmnopqrstuvwxzyABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');
const counter = require("quick.db")

function chunk(str, n) {
    var ret = [];
    var i;
    var len;

    for(i = 0, len = str.length; i < len; i += n) {
       ret.push(str.substr(i, n))
    }

    return ret
};

module.exports = {
  name: "setcategory",
  aliases: [],
  cooldown: 1,
  description: "تغيير مكان فتح التيكت",
  execute: async (client, message, args) => {

let category = counter.fetch("category")
let channel = message.channel.guild.channels.get(category || "123");
if(!args[0]) return client.createMessage(message.channel.id, channel ? `The current category is ${channel.name}` : "No current category for now")

let uu = message.channel.guild.channels.get(args[0]) || message.channel.guild.channels.find(a => a.name.toLowerCase() === args.join(" ").toLowerCase());
if(!uu) return client.createMessage(message.channel.id, `I can't find ${args[0]}`)

counter.set("category", uu.id);
return client.createMessage(message.channel.id, `The new category is ${uu.name}`)
  }}