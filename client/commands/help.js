module.exports = {
	name: 'help', // اسم الامر
	description: "Help of commands", // شرح الامر
	cooldown: 1, // الكول داون بـ الثواني
	execute: async function(db,bot ,msg , args) {
db.get("prefix", {"groupid": msg.channel.id}).then(row =>{
let prefixs = "$"
if(!row || row.length < 1) {
prefixs = "$"
}else{
prefixs = row[0].prefix
}
const replaceall = require("replaceall")
const onee = "`[prefix]yesorno`,`[prefix]gay`,`[prefix]skin`,`[prefix]ms`,`[prefix]cape`,`[prefix]calculator`,`[prefix]ping`,`[prefix]tax`"
const one = replaceall('[prefix]', prefixs, onee)
const twoo = "`[prefix]profile`,`[prefix]user`,`[prefix]avatar`,`[prefix]topcredits`,`[prefix]topxp`,`[prefix]credits`"
const two = replaceall('[prefix]', prefixs, twoo)
const threee = "`[prefix]clan`,`[prefix]group`,`[prefix]join [link invite group!]`"
const three = replaceall('[prefix]', prefixs, threee)
const forrr = "`[prefix]vip list`,`[prefix]vip setgroup [idgroup]`,`[prefix]vip move [mention user]`,`[prefix]unencrypt`"
const forr = replaceall('[prefix]', prefixs, forrr)
const endd = "`[prefix]adduse`,`[prefix]admins`,`[prefix]encrypt`"
const end = replaceall('[prefix]', prefixs, endd)
let gg = ""
db.get("adduse", {"groupid": msg.channel.id}).then(rows =>{
if(rows.length < 1) {
gg = "`None`"
}else{
for(const data of rows) gg = gg + "," + "`" + data.use + "`" 
}
if(!args[0]) return bot.createMessage(msg.channel.id, {
  "content": "You Can Help of command for use: $help [commandname]",
  "embed": 
    {
       "title": "Help!",
       "description": "Help Of All Commands!",
      "color": 5182122,
      "fields": [
        {
          "name": "General Commands:",
          "value": one
        },
        {
          "name": "ProBot Commands:",
          "value": two
        },
        {
          "name": "Only Group Commands:",
          "value": three
        },
        {
          "name": "Donation's Commands:",
          "value": forr
        },
        {
          "name": "Other Commands:",
          "value": end
        },
        {
          "name": "Other Links:",
          "value": "[API GroupBot](https://discord.gg/kNp7JzdZQU) | [Partner Server](https://discord.gg/KGn2KVZ) | [Other Bot of developers](https://discord.gg/kh5h8yfuWB) | [Developers](https://pastebin.com/Xn0ucBwh)"
        }     
],
      "footer": {
        "text": "GroupBot",
       "icon_url": "https://cdn.discordapp.com/avatars/773282878019731533/5f3b0aad5adf8c654b5c3ba4c7083c07.jpg?size=128"
      },
     "timestamp": new Date()
    }
  
})
})
if(args[0]){
let ggs = ""
db.get("adduse", {"groupid": msg.channel.id, command: args[0]}).then(rows =>{
if(rows.length < 1) {
ggs = "`None`"
}else{
for(const data of rows) ggs = ggs + "," + "`" + data.use + "`" 
}
var commands = bot.commands.get(args[0]) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(args[0]));
if(!commands) return bot.createMessage(msg.channel.id, `I Can't find this command!`)
bot.createMessage(msg.channel.id, {
  "content": "You Can Help of command for use: $help [commandname]",
  "embed": {
      "title": "Help!",
      "description": "Help Of " + commands.name,
      "color": 5182122,
      "fields": [
        {
          "name": "Description:",
          "value": commands.description
        },
        {
          "name": "CoolDown:",
          "value": commands.cooldown
        },
        {
          "name": "Use:",
          "value": ggs.replace(',', '')
        },
        {
          "name": "Other Links",
          "value": "[API GroupBot](https://discord.gg/kNp7JzdZQU) | [Partner Server](https://discord.gg/KGn2KVZ) | [Other Bot of developers](https://discord.gg/kh5h8yfuWB) | [Developers](https://pastebin.com/Xn0ucBwh)"
        }     
],
      "footer": {
        "text": "GroupBot",
       "icon_url": "https://cdn.discordapp.com/avatars/773282878019731533/5f3b0aad5adf8c654b5c3ba4c7083c07.jpg?size=128"
      },
     "timestamp": new Date()
}
})
})
}
})
	},
};
