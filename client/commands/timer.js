module.exports = {
	name: 'timer', // اسم الامر
	description: "set timer and delete and list timer", // شرح الامر
	cooldown: 1, // الكول داون بـ الثواني
	execute: async function(db,bot ,msg , args) {
const ms = require('ms');
if(!args[0]){
bot.createMessage(msg.channel.id, `I Can help you?
[1] add
[2] list
[3] delete
[4] auto [SOON]
`)
}

if(args[0] === "add"){
const ms = require("ms")
if(!args[1] || !args[2]) return bot.createMessage(msg.channel.id, `i can't find timer or name`)
const timers = ms(args[1])
if(!timers) return bot.createMessage(msg.channel.id, `timer has find`)
db.get("timer", {"name": args.slice(2).join(" ") }).then(rows =>{
if(!rows || rows.length < 1 || rows.length === 0) {
db.insert("timer" , {"owner": msg.author.id,"time": Date.now() + timers, timer: ms(timers), name: args.slice(2).join(" ") , auto: "false", channel: msg.channel.id})
bot.createMessage(msg.channel.id, `done`)
}else{
bot.createMessage(msg.channel.id, `Name Has Already register!`)
}
})
}
  if(args[0] === "remove"){
if(!args[1]) return bot.createMessage(msg.channel.id, `i can't find name`)
db.get("timer", {"name": args.slice(1).join(" ") }).then(rows =>{
if(!rows || rows.length < 1 || rows.length === 0) return bot.createMessage(msg.channel.id, `${args.slice(1).join(" ")} Not Found In Data.`)
if(rows[0].owner !== msg.author.id) return bot.createMessage(msg.channel.id, `${args[0]} Not Found In Your Data.`) 
db.delete("timer", {"_id": rows[0]._id})
bot.createMessage(msg.channel.id, `done`)
})
  }
  if(args[0] === "list"){
db.get("timer", {"owner": msg.author.id}).then(rows =>{
if(!rows || rows.length < 1 || rows.length === 0) return bot.createMessage(msg.channel.id, `Listed Timer:

- NONE!
`)
//${data._id} \nName: ${data.name} | End At: ${ms(data.timer - Date.now())} | Auto: ${data.auto}
let messages = ``
for(const data of rows) {
var time = data.time
if(data.time - Date.now() < 1000) time = "1s"
messages = messages + `${data._id} \nName: ${data.name} | End At: ${time} | Auto: ${data.auto}\n=====================`
}
bot.createMessage(msg.channel.id, `Listed Timer:

${messages}`)
})
  }
  if(args[0] === "auto"){
if(!args[1]) return bot.createMessage(msg.channel.id, `I Can't find name!`)
if(!args[1]) return bot.createMessage(msg.channel.id, `i can't find name`)
db.get("timer", {"name": args.slice(1).join(" ") }).then(rows =>{
if(!rows || rows.length < 1 || rows.length === 0) return bot.createMessage(msg.channel.id, `${args.slice(1).join(" ")} Not Found In Data.`)
if(rows[0].owner !== msg.author.id) return bot.createMessage(msg.channel.id, `${args[0]} Not Found In Your Data.`) 
if(!args[2]){
if(rows[0].auto === "false"){
rows[0].auto = "true"
db.update("timer", {"_id": rows[0]._id } , rows[0])
return bot.createMessage(msg.channel.id, `auto has true!.`) 
}else{
rows[0].auto = "false"
db.update("timer", {"_id": rows[0]._id } , rows[0])
return bot.createMessage(msg.channel.id, `auto has false!.`) 
}
}
})
  }
    	},
};
