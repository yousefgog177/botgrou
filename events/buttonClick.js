let codes = require('../db/codes.js');
let users = require("../db/user.js");

const randomToken = require('random-token').create('abcdefghijklmnopqrstuvwxzyABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');
const counter = require("quick.db")
const axios = require("axios");
var transporter = require('nodemailer');
const EmailSyntax = require('email-syntax').EmailSyntax;

module.exports = async(client, data, message, clicker, {id , token}) => {

if(message.channel.id !== "868283914412785774" || data.custom_id !== "ticket_creator_868283914412785774") return;

await axios.post(`https://discord.com/api/v8/interactions/${id}/${token}/callback` , { type:5, data: { flags:64 } }, { headers: {
authorization: client._token
}})

let reply = async(content, file) => {
        if (content !== undefined) {
            if (typeof content !== "object" || content === null) {
                content = {
                    content: "" + content
                };
            } else if (content.content !== undefined && typeof content.content !== "string") {
                content.content = "" + content.content;
            } else if (content.content === undefined && !content.embed && !file) {
                return Promise.reject(new Error("No content, file, or embed"));
            }
        } else if (!file) {
            return Promise.reject(new Error("No content, file, or embed"));
        }
        content.flags = 64
        return client.requestHandler.request("PATCH", `/webhooks/${client.user.id}/${token}/messages/@original`, true, content , file)
}


let activated = counter.fetch("turn")
if(!activated) return reply(`خاصية التذاكر مغلقة حاليًا ، حاول بعد فترة`)

let channels = message.channel.guild.channels.filter(a => {
let topic = a.topic
if(!topic) return false;

let json;
try { json = JSON.parse(topic) } catch { return false; }

return json.creator === clicker.id && !json.done
})
 
if(channels.length > 0) return reply(`لا يمكنك فتح تذكرة لانه توجد تذكرة لم يتم اتمامها بعد
${channels.map(a => `<#${a.id}>`).join(", ")}
`);

let number = counter.fetch("count") || counter.set("count" , 1)
counter.add("count" , 1)

let ticket = await client.createChannel(message.channel.guild.id, "ticket-" + number, 0, {
topic: JSON.stringify({"creator": clicker.id,time:new Date(),done:false}),
parentID: counter.fetch("category") || null
}).catch(err => { return; })

if(!ticket) {
ticket = await client.createChannel(message.channel.guild.id, "ticket-" + number, 0, {
topic: JSON.stringify({"creator": clicker.id,time:new Date(),done:false}),
parentID: null
}).catch(err => { return; })
}

if(!ticket) return reply(`فشل فتح التذكرة يرجي التواصل مع الادمن`)


await ticket.editPermission(message.guildID, 0, 1024, "role")
await ticket.editPermission(clicker.id, 1024, 0, "member")
reply(`<#${ticket.id}> قم بفتح التيكت لأتمام العملية`)

let userData = await users.findOne({ _id: clicker.id })  || await new users({ _id: clicker.id, access_token: "null", auth: randomToken(24) }).save();

if(!userData.email && userData.email !== null) {
let e = await ticket.createMessage(`قبل اكمل عملية قم بي ارسال ايميل خاص بك ، او كتابة \`لا\` اذا كنت لا ترد الافصاح عن الايميل الخاص بك\nلن نقوم بطلب هذا الاجراء مرة اخري`)

var dn = false
var email;
await new Promise(re =>{
client.on('messageCreate', (msg) =>{
if(msg.channel.id !== ticket.id || clicker.id !== msg.author.id) return;
if(dn === true) return;
dn = true
email = msg.content
re()
})
})

if (EmailSyntax.validate(email)){
await users.updateOne({ _id:clicker.id } , { email: email });
e.edit(`تم ادخال ايميل صحيح \`${email}\`\nلن نقوم بطلب هذا الاجراء منك مره اخري`)
}else{
await users.updateOne({ _id:clicker.id } , { email: null });
e.edit(`لم يتم ادخال ايميل صحيح\nلن نقوم بطلب هذا الاجراء منك مره اخري`)
}
}

client.editChannel(ticket.id, {
topic: JSON.stringify({"creator": clicker.id,time:new Date(),done:false, email:email }),
}).catch(err =>{})

ticket.createMessage(`<@${clicker.id}> مرحبًا بك في تيم لوج.
اذا كنت تريد شحن اعضاء الي سيرفرك اتبع الخطوات التالية
:one: قم بأستخدام امر \`${message.prefix || "$"}online\` اذا كنت تريد اعضاء اونلاين او امر \`${message.prefix || "$"}offline\` اذا كنت تريد اعضاء اوفلاين
:two: سيقوم البوت بأعطاك امر لتقوم بالتحويل الي البائع
:warning: اذا لم تقم بتحول المبلغ الصحيح سيقوم البوت بتقريب العدد ويعطيك كود بالعدد الذي قمت بتحويله
:three: ستقوم بالدخول الي موقعنا لأتمام العملية https://teamlog.store/
`)



}