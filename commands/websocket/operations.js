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
  name: "operations",
  aliases: ["op"],
  cooldown: 20,
  description: "لشراء مدفوعات",
  execute: async (client, message, args) => {

let wss = client.gateway
let kk = Object.keys(wss.auto)

let keys = kk.filter(k => wss.auto[k] && wss.auto[k].started && wss.auto[k].user_token && wss.auto[k].invCode);
const codesData = await codes.find({})

try { codesData = codesData.toJSON() } catch {}

let description = keys.map(k => {

let codeData = codesData.find(a => a._id === k)
let ret = `**<@${codeData.ownerID}> __${chunk(k, 4).join('-')}__
:red_circle: Offline: ${wss.auto[k].offline} | :green_circle: Online: ${wss.auto[k].online} | :coin: Coins: ${codeData.credits}
Server: https://discord.gg/${wss.auto[k].invCode}
**`

return ret
})

return client.createMessage(message.channel.id , description.join("\n\n") || "No one using the service now!")

  }}