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
  name: "addcredits",
  aliases: [],
  cooldown: 5,
  description: "لأضافة كريدت الي كود معين",
  execute: async (client, message, args) => {
let code = args[0]
if(!code) return client.createMessage(message.channel.id , `:x: **يجب عليك ادخال الكود**`);

code = code.split("-").join("")
let codeData = await codes.findOne({ _id: code })
if(!codeData) return client.createMessage(message.channel.id , `:x: **هذا الكود غير موجود**`);

if(!args[1] || !Number(args[1])) return client.createMessage(message.channel.id , `:x: **يجب عليك ادخال عدد الكريدت الذي تريد**`)
let resulting = Math.floor(args[1])

await codes.updateOne({ _id: code } , { $inc: { credits: resulting } })
codeData = await codes.findOne({ _id: code })

client.createMessage(message.channel.id, `
I have added ${resulting} :coin: to the code,
now credits amount on the code is ${codeData.credits} :coin:
`)


  }}