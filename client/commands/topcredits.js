module.exports = {
	name: 'topcredits', // اسم الامر
	description: "Top credits of probot", // شرح الامر
	cooldown: 120, // الكول داون بـ الثواني
	execute: async function(db,bot ,msg , args) {
const headers = {
"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.72 Safari/537.31",
"authorization": null
}
let num = 0
let nums = 0
let msgs = ``
const fetch = require("node-fetch")

 fetch('https://api.probot.io/top_credits', {
        method: 'GET',
        headers: headers,
    })
    .then(res => res.json())
    .then(json => {
for(const data of json){
num = num + 1
nums = nums + 1
if(num > 20){
bot.createMessage(msg.channel.id, `${msgs}`)
num = 0
msgs = ``
}
msgs = msgs + `Number: ${nums} | Name: ${data.name} | credits: ${data.credits}\n`
}
bot.createMessage(msg.channel.id, `${msgs}`)
}).catch(err =>{
})

	},
};
