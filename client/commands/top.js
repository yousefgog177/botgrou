module.exports = {
	name: 'top', // اسم الامر
	description: "top of 5 users", // شرح الامر
	cooldown: 1, // الكول داون بـ الثواني
	execute: async function(db,bot ,msg , args) {
const fs = require("fs")
var top1 = require("../../top/index.js");
console.log(top1)
var top = new top1(db)
function save() {
    fs.writeFileSync("./data/top.json", JSON.stringify(top, null, 4));
}
var allids = []
let data = await top.getall(msg.channel.id)
console.log(data)
let tops = data.sort((a ,b) => b.xp - a.xp)
console.log(tops)
var ontop = ``
let C = 0
 for(const data of tops){
if(C !== 5 && !allids.includes(data.id) && data.id !== bot.user.id){
let d = await top.get(data.id, msg.channel.id)
allids.unshift(data.id)
C++
if(data.id === msg.author.id) ontop = ontop + `\n**#${C} | <@${data.id}> XP: \`${d.xp}\`**`
if(data.id !== msg.author.id) ontop = ontop + `\n#${C} | <@${data.id}> XP: \`${d.xp}\``
}
}
return bot.createMessage(msg.channel.id, {
  "embed": 
    {
      "title": "\\📋 Channel Score Leaderboards",
      "color": 7469329,
      "fields": [
        {
          "name": "TOP 5 TEXT :speech_balloon:",
          "value": ontop
        }
      ]
    }
  
})
	},
};
