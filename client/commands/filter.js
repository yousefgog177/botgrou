const fetch = require('node-fetch')
module.exports = {
	name: 'filter', // اسم الامر
	description: "Filter Message", // شرح الامر
	cooldown: 5, // الكول داون بـ الثواني
	execute: async function(db,bot ,msg , args) {
let data = process.env
if(!args[0]){
fetch(('https://discord.com/api/v8/channels/[id]/messages/search?min_id=0'.replace('[id]', msg.channel.id)) , {method: 'GET', headers: { 'authorization': data.BOT_TOKEN }, referrerPolicy: "no-referrer"}).then(async ress =>{
  let json = await ress.json();
bot.createMessage(msg.channel.id, `Messages Length: ${json.total_results}`)
})
}else{
//https://discord.com/api/v8/channels/824025476707385345/messages/search?content=%D8%A7%D8%AD%D8%A8%D9%83
fetch(('https://discord.com/api/v8/channels/824025476707385345/messages/search'.replace('[id]', msg.channel.id).replace('[content]', args[0])) , {method: 'GET', params: { content: args[0] }, headers: { 'authorization': data.BOT_TOKEN }, referrerPolicy: "no-referrer"}).then(async ress =>{
  let json = await ress.json();
bot.createMessage(msg.channel.id, `Messages Length: ${json.total_results}`)
})
}

	},
};
