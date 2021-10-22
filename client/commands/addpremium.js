module.exports = {
	name: 'addpremium', // اسم الامر
	description: "Premium Add", // شرح الامر
	cooldown: 1, // الكول داون بـ الثواني
	execute(db,bot ,msg , args) {

const fs = require('fs')
const G1 = require("../../G1.eris/index.js")
const g1 = new G1()
const con = JSON.parse(fs.readFileSync("./data/config.json", "utf8"))
const con2 = JSON.parse(fs.readFileSync("./data/config2.json", "utf8"))
if(!con2["developer"].includes(msg.author.id)) return;
if(!args[0]) return bot.createMessage(msg.channel.id, `i can't find groupid`)
if(!args[1]) return bot.createMessage(msg.channel.id, `i can't find owner`)
if(!args[2]) return bot.createMessage(msg.channel.id, `i can't find premission
Like: Owner,Admin..
`)
if(con["pre"].find(d => d.groupid === args[0])) return bot.createMessage(msg.channel.id, `${args[0]} has ready premium`)
db.insert("premium" , {"groupid": args[0],"owner": args[1],"time": Date.now() + 2592000000, premission: "owner", ads: false})
        bot.createMessage(msg.channel.id, `**You Have Add Premium To ${args[0]} YAY**`);
	}, 
};
//discord