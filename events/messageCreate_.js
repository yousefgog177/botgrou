const randomToken = require('random-token').create('abcdefghijklmnopqrstuvwxzyABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');
let codes = require('../db/codes.js');
const fs = require("fs");
let users = require("../db/user.js");
const db = require("quick.db");

function chunk(str, n) {
    var ret = [];
    var i;
    var len;

    for(i = 0, len = str.length; i < len; i += n) {
       ret.push(str.substr(i, n))
    }

    return ret
};

let orderMessage = fs.readFileSync(`./messages/order_review.html`, {encoding:'utf8', flag:'r'})
let failedMessage = fs.readFileSync(`./messages/failed.html`, {encoding:'utf8', flag:'r'})
let nomoneyMessage = fs.readFileSync(`./messages/nomoney.html`, {encoding:'utf8', flag:'r'})
let doneMessage = fs.readFileSync(`./messages/done.html`, {encoding:'utf8', flag:'r'})

module.exports = async(client, message) => {
  let transporter = client.mailer;
  if(!message.guildID) return;
  if(!message.channel.topic) return;

let json;
try{ json = JSON.parse(message.channel.topic) } catch { return; }
if(!json || json.done) return;

let user = client.users.get(json.creator) || await client.getRESTUser(json.creator);
if(message.author.id !== "568572703985106985" || !message.content.includes(user.username) || !message.content.includes('has transferred')) return;

let userData = await users.findOne({ _id: json.creator })  || await new users({ _id: json.creator, auth: randomToken(24) }).save();
let { email } = userData


let money = message.content.replace(user.username, '').replace('**:moneybag: | ', '').replace('**', '').replace(', has transferred ', '')
.replace('`', '')
.replace('`', '')
.replace('$', '')
.replace(' to ', '')
.replace(`<@!${db.fetch("bank")}>`, '')
.replace(`<@${db.fetch("bank")}>`, '')

let pay = Number(money)

if(!Number(pay)) {

var mailOptions = {
  from: process.env.emailUsername,
  to: email,
  subject: `Order status (Order ID: ${message.channel.name.replace('ticket-', '')}) [Failed Transaction]`,
  html: failedMessage.split("{username}").join(user.username || user.user.username)
}; 
if(email) {
transporter.sendMail(mailOptions, function(error, info){
  if (error) { console.log(error); } else { console.log('Email sent: ' + info.response); }
});
}


client.createMessage(message.channel.id, 'لقد قمت بالتحويل للشخص الخاطئ')
return;
}

let resulting = Math.round(money / 760)

if(resulting < 1){
var mailOptions = {
  from: process.env.emailUsername,
  to: email,
  subject: `Order status (Order ID: ${message.channel.name.replace('ticket-', '')}) [No Money]`,
  html: nomoneyMessage.split("{username}").join(user.username || user.user.username)
}; 

if(email) {
transporter.sendMail(mailOptions, function(error, info){
  if (error) { console.log(error); } else { console.log('Email sent: ' + info.response); }
});
}

 return client.createMessage(message.channel.id, 'اقل سعر للتحويل هو 800 كريدت')
}
var codeRedeem = randomToken(16)
var codesendtouser = chunk(codeRedeem, 4).join('-');
let code = await new codes({
_id: codeRedeem,
ownerID: json.creator,
credits: resulting,
at: new Date()
}).save();

json.done = true

client.editChannel(message.channel.id, {
topic: JSON.stringify(json)
})

client.addGuildMemberRole(message.guildID, json.creator, "862749184339476490", "get a code from the bot").catch(error => console.log(error.message))

message.channel.createMessage(`كود التفعيل: ${codesendtouser}
رابط الدخول للداش بورد مباشرة : https://teamlog.store/use/${codeRedeem}

🪙 عدد الكريدت التي تم اضافتها في الكود ${resulting} 
🔴 عدد الاعضاء الاوفلاين الممكن اضافتهم ${resulting}
🟢 عدد الاعضاء الاونلاين الممكن اضافتهم ${Math.floor(resulting / 2)}


ملاحظة: 
- لا يمكنك الشراء في هذه التذكرة مره اخري يجب عليك فتح تذكرة جديدة${email ? `\n- تم ارسال رمز التفعيل الي ايميل التالي: ${email}` : ""}
`)

var mailOptions = {
  from: process.env.emailUsername,
  to: email,
  subject: `Order status (Order ID: ${message.channel.name.replace('ticket-', '')}) [Completed]`,
  html: doneMessage.split("{username}").join(user.username || user.user.username).split("{codesendtouser}").join(codesendtouser)
};

if(email) {
transporter.sendMail(mailOptions, function(error, info){ 
if (error) { console.log(error); } else { console.log('Email sent: ' + info.response); }
});
}

}