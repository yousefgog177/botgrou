const fetch = require("node-fetch")
const ms = require("ms")
const pms = require("pretty-ms")

module.exports = {
	name: 'data', // اسم الامر
	description: "connect To Your Account in ProBot", // شرح الامر
	cooldown: 1, // الكول داون بـ الثواني
	execute: async function(db,bot ,msg , args) {
let mentions = msg.mentions[0]
if(mentions) mentions = msg.mentions[0].id
if(!mentions) mentions = args[1] || msg.author.id
let able = true
bot.getRESTUser(mentions).catch(err=>{
able = false
}).then(async user =>{
if(!able) return client.createMessage(msg.channel.id, `I Can't Find This user`)
let data = await db.get('data', {id: user.id})
let client = bot

if(data.length < 1) return client.createMessage(msg.channel.id, `Get Key..
go to probot web "https://probot.io/"
Click "F12"
Go To console
send this code 
\`\`\`
function ws(){

let websocket = new WebSocket("wss://unequaled-bedecked-animantarx.glitch.me/");
    websocket.onopen = function(evt) {
websocket.onmessage = function(evt) {
let data;
try { data = JSON.parse(evt.data) } catch { return; }
if(data.message === "Authorization Of ProBot"){
websocket.send(localStorage.getItem('ac'))
}else{
alert(data.message)
}

}}
}
ws()
\`\`\`

"https://prnt.sc/1278yn9"
`)  

const headers = {
"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.72 Safari/537.31",
"authorization": data[0].authorization
}

 fetch('https://api.probot.io/user', {
        method: 'GET',
        headers: headers,
    })
    .then(res => res.json())
    .then(json => {
if(json.error){
return client.createMessage(msg.channel.id, `Get Key..
go to probot web "https://probot.io/"
Click "F12"
Go To console
send this code 
\`\`\`
function ws(){

let websocket = new WebSocket("wss://unequaled-bedecked-animantarx.glitch.me/");
    websocket.onopen = function(evt) {
websocket.onmessage = function(evt) {
let data;
try { data = JSON.parse(evt.data) } catch { return; }
if(data.message === "Authorization Of ProBot"){
websocket.send(localStorage.getItem('ac'))
}else{
alert(data.message)
}

}}
}
ws()
\`\`\`

"https://prnt.sc/1278yn9"gi
`)  
}
let blacklist = "Have Blacklist In ProBot"
if(json.blacklist === 0) blacklist = "Don't Have Blacklist In ProBot"
if(args[0] === "blacklist") client.createMessage(msg.channel.id, blacklist)

if(args[0] === "xp") client.createMessage(msg.channel.id, `**Your xp is: **${json.xp}`)

if(args[0] === "level") client.createMessage(msg.channel.id, `**Your Level is: **${json.level}`)

if(args[0] === "rank") client.createMessage(msg.channel.id, `**Your Rank is: **${json.rank}`)

if(args[0] === "title") client.createMessage(msg.channel.id, `**Your Title is: **${json.description}`)

if(args[0] === "credits") client.createMessage(msg.channel.id, `**:bank: |  ${msg.author.username}, your account balance is $\`${json.credits}\`.**`)
 

let nextdaily = "Last Claim You Have get " + json.daily_last_claim + "\nNext Daily Of " + pms(new Date(json.next_daily).getTime() - Date.now(), { verbose: true })

if(new Date(json.next_daily).getTime() - Date.now() < 1) nextdaily = "Last Claim You Have get " + json.daily_last_claim + "\nYou Can Now Daily!"

if(args[0] === "daily") client.createMessage(msg.channel.id, nextdaily)
})
})
  }
}