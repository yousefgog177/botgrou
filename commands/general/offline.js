const math = require('math-expression-evaluator');
const db = require("quick.db");

module.exports = {
  name: "offline",
  aliases: [],
  cooldown: 5,
  description: "لحساب كم يجب ان تدفع للحصول علي الاعضاء",
  execute: async (client, message, args) => {

let count = Number(args[0])

if(!count) return client.createMessage(message.channel.id , `:x: يجب عليك ادخال العدد الذي تريده`)

let answer;
try {
answer = math.eval(`${count} * 800`);
} catch (err) {
return client.createMessage(message.channel.id, `:x: لا يمكنني حساب هذه المسألة الحسابية ، المشكلة:\n` + "```" + err.message + "```") 
}

client.createMessage(message.channel.id, `
**🔴 ${count} عضو اونلاين**

المبلغ اللازم تحويله: ${answer}
التحويل الي: <@${db.fetch("bank")}>

🔶 **امر التحويل كامل** :
\`\`\`#credits ${db.fetch("bank")} ${answer}\`\`\`
`)

  }}