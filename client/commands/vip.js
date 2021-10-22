module.exports = {
	name: 'vip', // اسم الامر
	description: "Your Group List Premium", // شرح الامر
	cooldown: 1, // الكول داون بـ الثواني
	execute: async function(db,bot ,msg , args) {
    const moment = require('moment');
const ms = require('ms');
const fs = require('fs');
const con = JSON.parse(fs.readFileSync("./data/config.json", "utf8"))
db.get("premium", {"owner": msg.author.id}).then(rows =>{


if(!args[0]) return bot.createMessage(msg.channel.id, `I Can Help You?
[1] PremiumList \`list\`
[2] EditGroup \`setgroup\`
[3] moveOwnerShip \`move\`
.`)
if(args[0] === "list" || args[0] === "1"){
if(rows.length < 1) return bot.createMessage(msg.channel.id, `You No Have PremiumGroup`)
var msgs = ``
//var allend = true
for(const data of rows){
if(data.time - Date.now() > 1){
//allend = true
var as = data.time 
var timed = as - Date.now()
if(times < 1000) times = "**End**"
var times = ""
if(timed > 1000) times = "**" + moment(as - Date.now()).format('ss') + " **secound "
var timem = ""
if(timed > 60000) timem = "**" + moment(as - Date.now()).format('mm') + " **minute, "
var timeh = ""
if(timed > 3600000) timeh = "**" + moment(as - Date.now()).format('h') + " **hour, "
var timedd = ""
if(timed > 86400000) timedd = "**" + moment(as - Date.now()).format('D') + " **day, "
//let TIME = moment.utc(moment.duration(Date.now() + as).asMilliseconds()).format("lll");

let TIME = `${timedd}${timeh}${timem}${times}`
//let TIME = moment.utc(data.time).countdown().toString();
msgs = msgs + `\nPremiumGroup ${data._id}\nTime: ${TIME}\nGroup: ${data.groupid}\n==============`
}else{
//allend = true
var as = data.time 
var timed = Date.now() - as
if(times < 1000) times = "**1 secound Ago**"
var times = ""
if(timed > 1000) times = "**" + moment(Date.now() - as).format('ss') + " **secound Ago "
var timem = ""
if(timed > 60000) timem = "**" + moment(Date.now() - as).format('mm') + " **minute Ago, "
var timeh = ""
if(timed > 3600000) timeh = "**" + moment(Date.now() - as).format('h') + " **hour Ago, "
var timedd = ""
if(timed > 86400000) timedd = "**" + moment(Date.now() - as).format('D') + " **day Ago, "
//let TIME = moment.utc(moment.duration(Date.now() + as).asMilliseconds()).format("lll");
let dataa = con['pre'].find(d => d.groupid === data.groupid)
if(dataa) con["pre"].shift(dataa)
//let TIME = `${ms(timed)}`
let TIME = `${timedd}${timeh}${timem}${times}`
//let TIME = moment.utc(data.time).countdown().toString();
msgs = msgs + `\nPremiumGroup ${data._id} **End**\nTime: ${TIME}\nGroup: ${data.groupid}\n==============`

//db.delete("GroupBot" , "premium",{"nu": data.nu})
}
}
if(!msgs) return bot.createMessage(msg.channel.id, `Sorry, You No Have Premium Group.`)
bot.createMessage(msg.channel.id, msgs)
}
})
if(args[0] === "setgroup" || args[0] === "2"){
/*let data = process.env
if(!args[2] || !args[1]) return bot.createMessage(msg.channel.id, `use: ${data.prefix}vip setgroup [premium ID] [idgroup/this]`)
db.get("premium", {"_id": args[1]}).then(rows =>{
if(rows.length < 1) return bot.createMessage(msg.channel.id, `Sorry, I Can't find PremiumGroup`)
if(rows[0].time - Date.now() < 1) return bot.createMessage(msg.channel.id, `Sorry, This Premium Permission 0.`)
if(rows[0].owner !== msg.author.id) return bot.createMessage(msg.channel.id, `Sorry, Owner This Premium Only Can Edit.`)
if(rows[0].premission !== "coowner" && rows[0].premission !== "owner") return bot.createMessage(msg.channel.id, `Sorry, Only Permission Owner/CoOwner Can Edit Group.`)
if(args[2] === "this") args[2] = msg.channel.id
if(con["pre"].includes(args[2])) return bot.createMessage(msg.channel.id, `This Group Has Already Premium`)
con["pre"].unshift(args[2])
con["pre"].shift(rows[0].grouid)
rows[0].groupid = args[2]
            fs.writeFile("./config.json", JSON.stringify(con, null, 5), function(err) {if(err) console.log(err)});
db.update("premium", {"_id": rows[0]._id }, rows[0])
console.log(rows[0])*/
bot.createMessage(msg.channel.id, `https://apigroup.glitch.me/setgroup`)
//})
}
if(args[0] === "move" || args[0] === "3"){
let data = process.env
if(!args[2] || !args[1]) return bot.createMessage(msg.channel.id, `use: ${data.prefix}vip move [premium number] [user mention]`)
db.get("premium", {"_id": Math.floor(args[1])}).then(rows =>{
if(rows.length < 1) return bot.createMessage(msg.channel.id, `Sorry, I Can't find PremiumGroup`)
if(rows[0].time - Date.now() < 1) return bot.createMessage(msg.channel.id, `Sorry, This Premium Permission 0`)
if(rows[0].owner !== msg.author.id) return bot.createMessage(msg.channel.id, `Sorry, Owner This Premium Only Can Edit.`)
if(rows[0].premission !== "owner") return bot.createMessage(msg.channel.id, `Sorry, Only Permission Owner Can Move Ship.`)
let user = msg.mentions[0]
if(!user) return bot.createMessage(msg.channel.id, `i can't find user`)
rows[0].owner = user.id
db.update("premium", {"_id": rows[0]._id} , rows[0])
bot.createMessage(msg.channel.id, `Done`)
})

}


	},
};
