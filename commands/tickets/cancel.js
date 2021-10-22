module.exports = {
  name: "cancel",
  aliases: [],
  cooldown: 5,
  description: "لألغاء امر الشراء",
  execute: async (client, message, args) => {
  if(!message.channel.topic) return client.createMessage(message.channel.id, `يستخدم هذا الامر في التيكتات فقط`);

let json;
try { json = JSON.parse(message.channel.topic) } catch { return client.createMessage(message.channel.id, `يستخدم هذا الامر في التيكتات فقط`); }
if(json.done) return client.createMessage(message.channel.id, `لقد تمت هذه العملية انتظر الستاف ليقوموا بأقفال التيكت`)
if(json.creator !== message.author.id) return client.createMessage(message.channel.id, `فقط من فتح التذكرة يمكنه اقفالها`)

client.createMessage(message.channel.id, `سيتم اغلاق التيكت خلال 5 ثواني`)

setTimeout(() => message.channel.delete() , 5000)

  }}