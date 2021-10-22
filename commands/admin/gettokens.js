const randomToken = require('random-token').create('abcdefghijklmnopqrstuvwxzyABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');
let codes = require('../../db/codes.js')

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
  name: "gettokens",
  aliases: [],
  cooldown: 5,
  description: "للحصول علي التوكنات التي تم انشائهم من كود معين",
  execute: async (client, message, args) => {
let code = args.join(" ")
if(!code) return client.createMessage(message.channel.id , `:x: **يجب عليك ادخال الكود**`);

code = code.split("-").join("")
let codeData = await codes.findOne({ _id: code })
if(!code) return client.createMessage(message.channel.id , `:x: **هذا الكود غير موجود**`);

let offlineBuffer = Buffer.from(codeData.tokens.join("\n"));
let onlineBuffer = Buffer.from(codeData.online_tokens.join("\n"));

client.createMessage(message.channel.id, `Tokens` , [
{
file: offlineBuffer,
name: "offline.txt"
},
{
file: onlineBuffer,
name: "online.txt"
}
])

  }}