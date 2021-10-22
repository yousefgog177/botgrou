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
  name: "buy",
  aliases: [],
  cooldown: 20,
  description: "لشراء مدفوعات",
  execute: async (client, message, args) => {
if(message.channel.id !== "868283914412785774") return;
let msg = message

let channels = message.channel.guild.channels.filter(a => {
let topic = a.topic
if(!topic) return false;

let json;
try { json = JSON.parse(topic) } catch { return false; }

return json.creator === message.author.id && !json.done
})

if(channels.length > 0) return message.channel.createMessage(`<@${message.author.id}>, لا يمكنك فتح تذكرة لانه توجد تذكرة لم يتم اتمامها بعد
${channels.map(a => `<#${a.id}>`).join(", ")}
`);

let number = counter.fetch("count") || counter.set("count" , 1)
counter.add("count" , 1)

let ticket = await client.createChannel(msg.channel.guild.id, "ticket-" + number, 0, {
topic: JSON.stringify({"creator": message.author.id,time:new Date(),done:false}),
parentID: "868565428975333456"
})

await ticket.editPermission(message.guildID, 0, 1024, "role")
await ticket.editPermission(msg.author.id, 1024, 0, "member")

ticket.createMessage(`<@${msg.author.id}> مرحبًا بك في تيم لوج.
اذا كنت تريد شحن اعضاء الي سيرفرك اتبع الخطوات التالية
:one: قم بأستخدام امر \`${message.prefix}online\` اذا كنت تريد اعضاء اونلاين او امر \`${message.prefix}offline\` اذا كنت تريد اعضاء اوفلاين
:two: سيقوم البوت بأعطاك امر لتقوم بالتحويل الي البائع
:warning: اذا لم تقم بتحول المبلغ الصحيح سيقوم البوت بتقريب العدد ويعطيك كود بالعدد الذي قمت بتحويله
:three: ستقوم بالدخول الي موقعنا لأتمام العملية https://teamlog.store/
`)

message.channel.createMessage(`<@${message.author.id}>, <#${ticket.id}> قم بفتح التيكت لأتمام العملية`)

  }
};
