const fetch = require("node-fetch")
const ms = require("ms")
const moment = require('moment')
module.exports = {
	name: 'connect', // اسم الامر
	description: "connect To Your Account in ProBot", // شرح الامر
	cooldown: 1, // الكول داون بـ الثواني
	execute: async function(db,bot ,msg , args) {

let client = bot
if(!args[0]) return client.createMessage(msg.channel.id, `Get Key..
go to probot web "https://probot.io/"
Click "F12"
Go to network "https://prnt.sc/125jd8b" then click to "dashboard"
Click To Name "user" and method "get" like "https://prnt.sc/125jesb"
then Go To Headers then go to Request Headers "https://prnt.sc/125jjqk"
Copy "authorization" 
use: connect "authorization"
`)  
  
const headers = {
"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.72 Safari/537.31",
"authorization": args[0]
}

 fetch('https://api.probot.io/user', {
        method: 'GET',
        headers: headers,
    })
    .then(res => res.json())
    .then(async json => {
if(json.error){
return client.createMessage(msg.channel.id, `Get Key..
go to probot web "https://probot.io/"
Click "F12"
Go to network "https://prnt.sc/125jd8b" then click to "dashboard"
Click To Name "user" and method "get" like "https://prnt.sc/125jesb"
then Go To Headers then go to Request Headers "https://prnt.sc/125jjqk"
Copy "authorization" 
use: connect "authorization"
`)  
}
if(json.id !== msg.author.id) return client.createMessage(msg.channel.id, `For Protection and safety.. Can't Connect Other Account`)
let data = await db.get('data', {id: json.id})

if(data.length < 1){
db.insert('data', {authorization: args[0], id: json.id})
}else{
data[0].authorization = args[0]
db.update("data", {"id": json.id } , data[0])
}



client.createMessage(msg.channel.id, `Congratulations Commands unlocked:
\`data credits\`
\`data nexdaily\`
\`data title\`
\`blacklist\`
\`data rank\`
\`data level\`
\`data rep\`
\`data xp\`

Your Account Data: ${moment(json.next_daily)}
`)
console.log(json)
 })
  }
}