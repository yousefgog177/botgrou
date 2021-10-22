const imageToBase64 = require('image-to-base64');

module.exports = {
	name: 'editbot', // اسم الامر
	description: "Edit Avatar/Game/Stream and other", // شرح الامر
	cooldown: 1, // الكول داون بـ الثواني
	execute: async function(db,bot ,msg , args) {
db.get("prefix", {"groupid": msg.channel.id}).then(row =>{
let prefixs = "$"
if(!row || row.length < 1) {
prefixs = "$"
}else{
prefixs = row[0].prefix
}
function save() {
            fs.writeFile("./data/config2.json", JSON.stringify(con, null, 5), function(err) {if(err) console.log(err)});
}
const G1 = require("../../G1.eris/index.js")
let g1 = new G1();

let data = process.env
const fs = require('fs')
const prefix = prefixs

const con = JSON.parse(fs.readFileSync("./data/config2.json", "utf8"))
if(!con["developer"].includes(msg.author.id)) return;
if(!args[0]) return bot.createMessage(msg.channel.id, `i can help you?.
[1] Playing
[2] stream
[3] Avatar
Like: ${prefix}editbot [type] [status] | ${prefix}editbot 1 Hi.
`)
if(args[0] === "1"){
if(!args[1]) {
 g1.setgame("online", "")
return bot.createMessage(msg.channel.id, `I Have Remove All Status`)
}
bot.createMessage(msg.channel.id, `I Have Edit Playing Bot To ${args.slice(1).join(" ")}`)
g1.setgame("online", args.slice(1).join(" "))
}
if(args[0] === "2"){
if(!args[1]) {
 g1.setgame("online", "")
return bot.createMessage(msg.channel.id, `I Have Remove All Status`)
}
g1.setstream("online", args.slice(1).join(" "))
}
if(args[0] === "3"){
if(!args[1]) return bot.createMessage(msg.channel.id, `i can't find link`)
let image = args[1]
if(msg.attachments.length > 0){
image = msg.attachments[0].url || args.slice(1).join(" ")
}

imageToBase64(image).then((response) => {

g1.setavatar(`data:text/plain;base64,` + response).then(user =>{
bot.createMessage(msg.channel.id, `I Have Edit Avatar Bot To ${args.slice(1).join(" ")}`)
}).cacth(err=>{
 bot.createMessage(msg.channel.id, `Error!`)
})
})
}
})
	},
};
