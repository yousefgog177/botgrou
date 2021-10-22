let codes = require('../../db/codes.js')

const moment = require("moment");
moment.locale("ar-TN");
const dateFormat = require("intl-dateformat");

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
  name: "getcodes",
  aliases: [],
  cooldown: 5,
  description: "لعرض جميع الاكواد الخاصة بعضو معين",
  execute: async (client, message, args) => {
    let embed = {
      title: "Codes List",
      color: 16711680,
      description: ``,
      thumbnail: {
        url: message.channel.iconURL
      }
    };

if(!args[0] && !message.mentions[0]) return client.createMessage(message.channel.id , `:x: منشن العضو`);

let user = message.mentions[0] || message.channel.guild.members.get(args[0] || "None")
if(!user) return client.createMessage(message.channel.id , `:x: لم اعثر علي هذا العضو`);



 let codesDat = await codes.find({ ownerID: user.id })
 let codesData = codesDat
if(codesData.length < 1) return client.createMessage(message.channel.id , `:x: لا يوجد لديه اكواد`);

embed.description = `<@${user.id}>\n\n` + codesData.map(a => `\`${chunk(a._id, 4).join('-')}\`: **${a.credits} :coin:** : **${dateFormat.default(a.at,"YYYY/MM/DD hh:mm A", { timezone: "Asia/Riyadh" })} :flag_sa:**`).join("\n")

message.author.getDMChannel().catch(err => {
return client.createMessage(message.channel.id , `:x: لم اتمكن من ارسال الرسالة`);
}).then(channel => {


let er = false;
client.createMessage(channel.id, { embed: embed }).catch(err => {
er = true
}).then(msg => {
if(er) return client.createMessage(message.channel.id , `:x: لم اتمكن من ارسال الرسالة`);
client.createMessage(message.channel.id , `✅ قم بفتح الخاص`);
})

})

  }
};
