module.exports = {
	name: 'adduse', // اسم الامر
	description: "add use for commands", // شرح الامر
	cooldown: 1, // الكول داون بـ الثواني
	execute: async function(db,bot ,msg , args) {
db.get("prefix", {"groupid": msg.channel.id}).then(row =>{
let prefixs = "$"
if(!row || row.length < 1) {
prefixs = "$"
}else{
prefixs = row[0].prefix
}
let data = prefixs
if(!args[0]) return bot.createMessage(msg.channel.id, `i can't find command`)
if(!args[1]) return bot.createMessage(msg.channel.id, `add or remove`)
if(!args[2]) return bot.createMessage(msg.channel.id, `i can't find use`)
if(args[1] === "add"){
var commands = bot.commands.get(args[0]) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(args[0]));
if(!commands) return bot.createMessage(msg.channel.id, `i can't find this command!`)
db.get("adduse", {"groupid": msg.channel.id, "use": args[2]}).then(rows =>{
if(rows.length < 1) {
db.insert("adduse" , {"groupid": msg.channel.id,"command": args[0], "use": data + args[0]})
db.insert("adduse" , {"groupid": msg.channel.id,"command": args[0], "use": args[2]})
bot.createMessage(msg.channel.id, `Done`)
}else{
bot.createMessage(msg.channel.id, `This Use Has Already registered`)
}
})
}
if(args[1] === "remove"){
var commands = bot.commands.get(args[0]) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(args[0]));
if(!commands) return bot.createMessage(msg.channel.id, `i can't find this command!`)
db.get("adduse", {"groupid": msg.channel.id, "use": args[2]}).then(rows =>{
if(rows.length < 1) {
bot.createMessage(msg.channel.id, `This Use Has Already unregistered`)
}else{
db.delete("adduse", {"use": args[2]})
bot.createMessage(msg.channel.id, `Done`)
}
})
}
})
	},
};
