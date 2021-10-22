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
  name: "turn",
  aliases: [],
  cooldown: 1,
  description: "لتفعيل والغاء تفعيل التيكت",
  execute: async (client, message, args) => {

let activated = counter.fetch("turn")
if(!args[0]) { args[0] = activated ? "off" : "on" }

if(["on", "true"].includes(args[0].toLowerCase())) {
counter.set("turn" , true)
client.createMessage(message.channel.id, `${counter.fetch("turn") ? ":white_check_mark:" : ":x:"} Tickets ${counter.get("turn") ? "" : "De"}Activated`)
}else
if(["off", "false"].includes(args[0].toLowerCase())) {
counter.delete("turn")
client.createMessage(message.channel.id, `${counter.fetch("turn") ? ":white_check_mark:" : ":x:"} Tickets ${counter.get("turn") ? "" : "De"}Activated`)
}

  }}