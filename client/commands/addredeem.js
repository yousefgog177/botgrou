module.exports = {
	name: 'addredeem', // اسم الامر
	description: "redeem Add", // شرح الامر
	cooldown: 1, // الكول داون بـ الثواني
	execute(db,bot ,msg , args) {
const fs = require('fs')
const con = JSON.parse(fs.readFileSync("./data/config.json", "utf8"))
const con2 = JSON.parse(fs.readFileSync("./data/config2.json", "utf8"))
if(!con2["developer"].includes(msg.author.id)) return;
let randomIdGenerator = require('random-id-generator');
 
let code1 = randomIdGenerator(4);
let code2 = randomIdGenerator(4);
let code3 = randomIdGenerator(4);
let code4 = randomIdGenerator(4);

db.insert("redeem" , {"code": `${code1}-${code2}-${code3}-${code4}`})
bot.createMessage(msg.channel.id, `**Code: ${code1}-${code2}-${code3}-${code4}**`);

  },
}