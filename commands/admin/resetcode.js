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
  name: "resetcode",
  aliases: [],
  cooldown: 5,
  description: "لتصفير كود معين",
  execute: async (client, message, args) => {
let code = args[0]
if(!code) return client.createMessage(message.channel.id , `:x: **يجب عليك ادخال الكود**`);

code = code.split("-").join("")
let codeData = await codes.findOne({ _id: code })
if(!codeData) return client.createMessage(message.channel.id , `:x: **هذا الكود غير موجود**`);


await codes.updateOne({ _id: code } , { credits: 0 })
codeData = await codes.findOne({ _id: code })

client.createMessage(message.channel.id, `
now credits amount on the code is ${codeData.credits} :coin:
`)


  }}