module.exports = {
  name: "close",
  aliases: [],
  cooldown: 1,
  description: "لألغاء امر الشراء",
  execute: async (client, message, args) => {
  if(!message.channel.topic) return client.createMessage(message.channel.id, `يستخدم هذا الامر في التيكتات فقط`);

let json;
try { json = JSON.parse(message.channel.topic) } catch { return client.createMessage(message.channel.id, `يستخدم هذا الامر في التيكتات فقط`) };

if(!message.member.permissions.has("manageGuild")) return client.createMessage(message.channel.id, `الامر للادارة فقط`);

if(!json.done && (!args[0] || args[0].toLowerCase() !== "confirm") ) {
return client.createMessage(message.channel.id, `لم تكتمل هذه العملية للاغلاق الاجباري استخدم امر
${message.prefix}close confirm`)
}

client.createMessage(message.channel.id, `سيتم اغلاق التيكت خلال 5 ثواني`)
setTimeout(() => message.channel.delete() , 5000)

  }}