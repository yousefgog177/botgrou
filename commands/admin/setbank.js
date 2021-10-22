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
  name: "setbank",
  aliases: [],
  cooldown: 1,
  description: "تغيير تحويل الكريدت",
  execute: async (client, message, args) => {

let bank = counter.fetch("bank") || counter.set("bank", "123");
let user = message.channel.guild.members.get(bank);
if(!args[0]) return client.createMessage(message.channel.id, user ? `The current bank is ${user.username + "#" + user.discriminator}` : "No current bank for now")

let uu = message.mentions.find(d => d) || message.channel.guild.members.get(args[0]);
if(!uu) return client.createMessage(message.channel.id, `I can't find ${args[0]}`)

counter.set("bank", uu.id);
return client.createMessage(message.channel.id, `The new bank is ${uu.username + "#" + uu.discriminator}`)
  }}