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
  name: "createcode",
  aliases: [],
  cooldown: 5,
  description: "لأنشاء كود جديد",
  execute: async (client, message, args) => {
console.log('r')
if(!args[0] || !Number(args[0])) return client.createMessage(message.channel.id , `:x: **يجب عليك ادخال عدد الكريدت الذي تريد**`)
  
let resulting = Math.floor(args[0])
console.log('rr')

if(resulting < 1) return client.createMessage(message.channel.id, 'اقل سعر للتحويل هو 800 كريدت')

var codeRedeem = randomToken(16)
var codesendtouser = chunk(codeRedeem, 4).join('-');
console.log('rrr')

let code = await new codes({
_id: codeRedeem,
ownerID: message.mentions[0] ? message.mentions[0].id : message.author.id,
credits: resulting,
at: new Date()
}).save();
console.log(code)

client.createMessage(message.channel.id, 
`\`\`\`${codesendtouser}\`\`\`
${message.mentions[0] ? `For <@${message.mentions[0].id}>` : "For you"}`)

  }}