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
  name: "movecode",
  aliases: [],
  cooldown: 5,
  description: "لنقل ملكية الكود الي احد اخر",
  execute: async (client, message, args) => {
let code = args[0]
if(!code) return client.createMessage(message.channel.id , `:x: **يجب عليك ادخال الكود**`);

code = code.split("-").join("")
let codeData = await codes.findOne({ _id: code })
if(!codeData) return client.createMessage(message.channel.id , `:x: **هذا الكود غير موجود**`);

if(!args[1]) return client.createMessage(message.channel.id , `:x: **منشن العضو او ضع الايدي**`);

let user = message.mentions[0] || message.channel.guild.members.get(args[1])
if(!user) return client.createMessage(message.channel.id , `:x: **لا يمكنني العثور علي العضو**`);

await codes.updateOne({ _id: code } , { ownerID: user.id })
let codeData1 = await codes.findOne({ _id: code })

return client.createMessage(message.channel.id , `I have moved the ownership of the code from <@${codeData.ownerID}> to <@${codeData1.ownerID}>`);
  }}