const GroupBot = require("./client/index.js")
GroupBot(process.env.BOT_TOKEN)

const bodyParser = require('body-parser');

const express = require("express");
const app = express();
app.use(bodyParser.json());
const fetch = require('node-fetch')
const fs = require('fs');
const Eris = require('eris');
const replaceall = require('replaceall')
const math = require('math-expression-evaluator');
const http = require('http')

let data = process.env
//listen
const token = data.BOT_TOKEN

function save(){
 fs.writeFile(`./data/config.json`, JSON.stringify(con, null, 5), function(err) {if(err) console.log(err)});
} 
 const HttpsProxyAgent = require('https-proxy-agent'); 



let all = `canselectinvites(#gstart1m1invTOPGG) 
can select winers(#gstart 1m 1w TOP GG)
can select winers+invites(#gstart 1m 1w1invTOPGG)
default0inv-1w(#gstart 1m TOP GG)
gmention..setroomsifmemberjoinmentionofthisroom
#gmentioncreate[channel][message]
endgiveaway#gend
groll(new random winner)#groll`
console.log(all.length)

const MongoClient = require("./MongoSimpleClient/index.js")
const db = new MongoClient("mongodb+srv://Main_DB_GroupBot:yCKSUKbd31pnQD1m@groupb.yolrs.mongodb.net/" , "GroupBot")
const client = new Eris(token , { restMode:true , defaultImageSize:2048 , disableEvents: ["voiceChannelJoin" , "voiceChannelSwitch" , "voiceChannelLeave" , "callCreate" , "callDelete" , "callRing" , "callUpdate"] });


client.commands = new Eris.Collection()
let cooldowns = new Eris.Collection()

const commandFiles = fs.readdirSync('./client/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./client/commands/${file}`);
	client.commands.set(command.name, command);
}

        const requests = fs.readdirSync(`./api_requests/`).filter(file => file.endsWith(".js"));


    fs.readdirSync("./api_requests/").forEach(dir => {
        const requests = fs.readdirSync(`./api_requests/${dir}/`).filter(file => file.endsWith(".js"));

        for (let file of requests) {
            let request = require(`./api_requests/${dir}/${file}`);
if(request.method && request.path){
app[request.method](request.path , (req , res) =>{

return request.run(req , res , client, db)
})
}} 

})


client.connect()
var server = http.createServer(app);

app.use(bodyParser.json());

var server = http.createServer(app);

const ws = require("ws")
var wss = new ws.Server({ server });

let acc = []
/*wss.on('connection', function connection(ws , req) {
ws.send(JSON.stringify({errors: [], message: "Request Token and cookie"}))
var num = 0
var token;
var cookie;
  ws.on('message', function incoming(message) {
num++
if(num === 1){
token = message
}
if(num === 2){
cookie = req.headers["cookie"]
db.get("web", {}).then(rowa =>{
let row;
for(const data of rowa){
 if(data.accounts.find(d => d.token === token && d.cookie === message)) row = data
}
if(!row){
ws.send(JSON.stringify({errors: ['authorization'], message: "Failed authorization"}))
 return wss.close()
}
let rows = row.accounts.find(d => d.token === token && d.cookie === message)
if(!rows) return ws.send(JSON.stringify({errors: ['authorization'], message: "Failed authorization"}))
ws.send(JSON.stringify({errors: [], message: "success"}))
acc.unshift({cookie: req.headers["cookie"], token: token, cookie: message})
})
}
if(num > 2){
console.log(message)
ws.send(JSON.stringify({errors: [], message: "lol"}))
}

  })
})*/

wss.on('connection', function connection(ws , req) {
ws.send(JSON.stringify({errors: [], message: "Authorization Of ProBot"}))
  ws.on('message', function incoming(message) {
const headers = {
"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.72 Safari/537.31",
"authorization": message
}

 fetch('https://api.probot.io/user', {
        method: 'GET',
        headers: headers,
    })
    .then(res => res.json())
    .then(async json => {
if(json.error) return ws.send(JSON.stringify({errors: ['authorization'], message: "Login To ProBot"}))

let data = await db.get('data', {id: json.id})

if(data.length < 1){
db.insert('data', {authorization: message, id: json.id})
}else{
data[0].authorization = message
db.update("data", {"id": json.id } , data[0])
}
ws.send(JSON.stringify({errors: [], message: "success", data: json}))
})
  })
})
/*
wss.on('connection', function connection(ws , req) {
ws.send(JSON.stringify({errors: [], message: "Request Token and cookie"}))
let num = 0
var token;
var cookie;
  ws.on('message', function incoming(message) {
num = num + 1
if(num === 1) token = message
if(num === 2){
cookie = message
db.get("web", {}).then(rowa =>{
let row;
for(const data of rowa){
 if(data.accounts.find(d => d.token === token && d.cookie === message)) row = data
}
if(!row){
ws.send(JSON.stringify({errors: ['authorization'], message: "Failed authorization"}))
 return wss.close()
}
let rows = row.accounts.find(d => d.token === token && d.cookie === message)
if(!rows) return ws.send(JSON.stringify({errors: ['authorization'], message: "Failed authorization"}))
row.accounts.shift({
    cookie: rows.cookie,
    token: rows.token,
    id: rows.id,
    enable: rows.enable,
    online: rows.online
})
row.accounts.unshift({
    cookie: rows.cookie,
    token: rows.token,
    id: rows.id,
    enable: rows.enable,
    online: rows.online + 1
})
db.update("web", {"_id": row._id } , row)
ws.send(JSON.stringify({errors: [], message: "Done", online: rows.online + 1}))
})
}
  });
ws.on('close', function close() {
ws.send(JSON.stringify({errors: [], message: "Done"}))
db.get("web", {}).then(rowa =>{
let row;
for(const data of rowa){
 if(data.accounts.find(d => d.token === token && d.cookie === cookie)) row = data
}
if(!row) return;
let rows = row.accounts.find(d => d.token === token && d.cookie === cookie)
if(!rows) return;
row.accounts.shift({
    cookie: rows.cookie,
    token: rows.token,
    id: rows.id,
    enable: rows.enable,
    online: rows.online
})
row.accounts.unshift({
    cookie: rows.cookie,
    token: rows.token,
    id: rows.id,
    enable: rows.enable,
    online: rows.online - 1
})
db.update("web", {"_id": row._id } , row)
})

});

})*/
server.listen(3000)
app.get("/assets/main.css", (req, res) => {
    res.sendFile(__dirname + "/assets/main.css");
})
app.get("/assets/discord.js", (req, res) => {
    res.sendFile(__dirname + "/assets/discord.js");
})
app.get("/assets/functions.js", (req, res) => {
    res.sendFile(__dirname + "/assets/functions.js");
})
app.get("/dashboard", (req, res) => {
res.sendFile(__dirname + "/html/Groups.html")
})

app.get("/getCaptcha", (req, res) => {
res.sendFile(__dirname + "/getCaptcha.html")
})
app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/html/login.html");
})
app.get("/server", (req, res) => {
    res.sendFile(__dirname + "/html/Groups.html");
})
app.get("/profile", (req, res) => {
    res.sendFile(__dirname + "/html/profile.html");
})
app.get("/server/:id", (req, res) => {
    res.sendFile(__dirname + "/html/Group.html");
})
app.get("/style.css", (req, res) => {
    res.sendFile(__dirname + "/style.css");
})
app.get("/styles.css", (req, res) => {
    res.sendFile(__dirname + "/styles.css");
})
app.get("/:id", (req, res) => {
    res.sendFile(__dirname + "/html/gotolink.html");
})
app.post("/api/fetch-error/*", (req, res) => {
if(!req.headers.authorization) return res.json({status:false , message: "API : Not authorizated"})
if(req.headers.authorization !== "ESazdxTze34") return res.json({status:false , message: "API : Worng authorizated"})
let data = req.body
if(!data)  return res.json({status:false , message: "API : Insert your data"})

let data_values = [
{"key": "ownerid", "value": null}
]


for(const test of data_values) {
if(!data[test.key]) {
if(test.value !== null) {
data[test.key] = test.value
}else{
return res.json({status:false , message: "API : the value '" + test.key + "' must be found"})
}}}
return res.send({status: true , message: "No Fetch Errored!"})
})
app.post("/api/premium/setgroup/*", (req, res) => {
if(!req.headers.authorization) return res.json({status:false , message: "API : Not authorizated"})
if(req.headers.authorization !== "ESazdxTze34") return res.json({status:false , message: "API : Worng authorizated"})
let data = req.body
if(!data)  return res.json({status:false , message: "API : Insert your data"})

let data_values = [
{"key": "groupid", "value": null},
{"key": "ownerid", "value": null}
]


for(const test of data_values) {
if(!data[test.key]) {
if(test.value !== null) {
data[test.key] = test.value
}else{
return res.json({status:false , message: "API : the value '" + test.key + "' must be found"})
}}}
if(con["pre"].includes(data["groupid"])) return res.json({status: false , message: "This Group Has Already Premium!"})
return res.json({status: true , message: "No Fetch Errored!"})
})
app.post("/api/connect", (req, res) => {
console.log(req.body)
if(!req.body.authy) return res.status(403).json({errors: ['authorization'], message: "Login To ProBot"})
  
const headers = {
"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.72 Safari/537.31",
"authorization": req.body.authy
}
console.log('hi2')

 fetch('https://api.probot.io/user', {
        method: 'GET',
        headers: headers,
    })
    .then(res => res.json())
    .then(async json => {
console.log('hi3')
if(json.error) return res.status(403).json({errors: ['authorization'], message: "Login To ProBot"})

let data = await db.get('data', {id: json.id})

if(data.length < 1){
db.insert('data', {authorization: req.headers.authorization, id: json.id})
}else{
data[0].authorization = req.headers.authorization
db.update("data", {"id": json.id } , data[0])
}
console.log('hi4')
res.status(200).json({errors: [], message: "success", data: json})
})
})
app.post("/api/setprefix/", (req, res) => {
if(!req.headers.authorization) return res.json({status:false , message: "API : Not authorizated"})
if(req.headers.authorization !== "ESazdxTze34") return res.json({status:false , message: "API : Worng authorizated"})
let data = req.body
if(!data)  return res.json({status:false , message: "API : Insert your data"})

let data_values = [
{"key": "groupid", "value": null},
{"key": "prefix", "value": null}
]


for(const test of data_values) {
if(!data[test.key]) {
if(test.value !== null) {
data[test.key] = test.value
}else{
return res.json({status:false , message: "API : the value '" + test.key + "' must be found"})
}}}
db.get("prefix", {"groupid": data.groupid}).then(rows =>{
if(!rows || rows.length < 1) {
let tests = data.prefix
if(tests.length > 1) return res.json({status: true, message: "Max Length 1", type: "Failed"})
if(tests.length < 0) return res.json({status: true, message: "Less Length 1", type: "Failed"})
db.insert("prefix" , {"groupid": data.groupid,"prefix": tests})
return res.json({status: true, message: `Now Prefix: ${tests}`, type: "success"})
}else{
let tests = data.prefix
if(tests.length > 1) return res.json({status: true, message: "Max Length 1", type: "Failed"})
if(tests.length < 0) return res.json({status: true, message: "Less Length 1", type: "Failed"})
rows[0].prefix = tests
db.update("prefix", {"groupid": data.groupid} , rows[0])
return res.json({status: true, message: `Now Prefix: ${tests}`, type: "success"})
}
})
})
app.post("/api/premium/add/*", (req, res) => {
if(!req.headers.authorization) return res.json({status:false , message: "API : Not authorizated"})
if(req.headers.authorization !== "ESazdxTze34") return res.json({status:false , message: "API : Worng authorizated"})
let data = req.body
if(!data)  return res.json({status:false , message: "API : Insert your data"})

let data_values = [
{"key": "groupid", "value": null},
{"key": "ownerid", "value": null}
]


for(const test of data_values) {
if(!data[test.key]) {
if(test.value !== null) {
data[test.key] = test.value
}else{
return res.json({status:false , message: "API : the value '" + test.key + "' must be found"})
}}}
if(con["pre"].includes(data["groupid"])) return res.send({status: false , message: "This Group Has Already Premium!"})
db.insert("premium" , {"nu": con["nu-addpremium"],"groupid": data["groupid"],"owner": data["ownerid"],"time": Date.now() + 2592000000, premission: "owner", ads: false})
res.json({status: true , message: "done"})

})
app.get("/" , (req , res , next) =>{

 res.sendStatus(200)

});

app.post("/api/setgroup/*" , async (req , res) =>{
if(!req.headers.authorization) return res.json({status:false , message: "API : Not authorizated"})
var all = "GROUP"
if(req.headers.authorization !== all) return res.json({status:false , message: "API : Wrong authorizated"})
let data = req.body
if(!data)  return res.json({status:false , message: "API : Insert your data"})

let data_values = [
{"key": "_id", "value": null},
{"key": "groupid", "value": null}
]


for(const test of data_values) {
if(!data[test.key]) {
if(test.value !== null) {
data[test.key] = test.value
}else{
return res.json({status:false , message: "API : the value '" + test.key + "' must be found"})
}}}
con = JSON.parse(fs.readFileSync("./data/config.json", "utf8"))
let groupid = data.groupid
let _id = data._id
if(!groupid || !_id) return res.json({status: false, message: "I Can't Find ID or GROUPID"})
db.get("premium", {"_id": _id}).then(rows =>{
if(rows.length < 1) return res.send({status: false, message: "Sorry, I Can't find PremiumGroup"})
if(rows[0].time - Date.now() < 1) return res.send({status: false, message: "Sorry, This Premium Permission 0."})
if(rows[0].premission !== "coowner" && rows[0].premission !== "owner") return res.send({status: false, message: "Sorry, Only Permission Owner/CoOwner Can Edit Group."})
if(con["pre"].includes(groupid)) return res.send({status: false, message: "This Group Has Already Premium"})
con["pre"].unshift(groupid)
con["pre"].shift(rows[0].groupid)
rows[0].groupid = groupid
            fs.writeFile("./data/config.json", JSON.stringify(con, null, 5), function(err) {if(err) console.log(err)});
db.update("premium", {"_id": rows[0]._id }, rows[0])
res.json({status: true, message: groupid + " Now Premium!"})

})
})


app.post("/api/redeem/*" , async (req , res) =>{
if(!req.headers.authorization) return res.json({status:false , message: "API : Not authorizated"})
var all = "GROUPBOT"
if(req.headers.authorization !== all) return res.json({status:false , message: "API : Wrong authorizated"})
let data = req.body
if(!data)  return res.json({status:false , message: "API : Insert your data"})

let data_values = [
{"key": "id", "value": null},
{"key": "redeem", "value": null}
]


for(const test of data_values) {
if(!data[test.key]) {
if(test.value !== null) {
data[test.key] = test.value
}else{
return res.json({status:false , message: "API : the value '" + test.key + "' must be found"})
}}}
let id = data.id
let code = data.redeem
if(!code || !id) return res.json({status: false, message: "I Can't Find ID or Code"})
db.get("redeem", {"code": code}).then(rows =>{
if(rows.length < 1) return res.send({status: false, message: "Sorry, I Can't find This Code"})
res.json({status: true, message: "You Have use redeem code!"})
db.insert("premium" , {"groupid": "none","owner": id,"time": Date.now() + 2592000000, premission: "owner", ads: false})
db.delete("redeem", {"code": rows[0].code})
})
})
app.post("/api/add/redeem/*" , async (req , res) =>{
if(!req.headers.authorization) return res.json({status:false , message: "API : Not authorizated"})
var all = "GROUPBOT"
if(req.headers.authorization !== all) return res.json({status:false , message: "API : Wrong authorizated"})
let data = req.body
if(!data)  return res.json({status:false , message: "API : Insert your data"})

let data_values = [
{"key": "redeem", "value": null}
]


for(const test of data_values) {
if(!data[test.key]) {
if(test.value !== null) {
data[test.key] = test.value
}else{
return res.json({status:false , message: "API : the value '" + test.key + "' must be found"})
}}}
let code = data.redeem
if(!code) return res.json({status: false, message: "I Can't Find Code"})
let randomIdGenerator = require('random-id-generator');
 
let code1 = randomIdGenerator(4);
let code2 = randomIdGenerator(4);
let code3 = randomIdGenerator(4);
let code4 = randomIdGenerator(4);

db.insert("redeem" , {"code": `${code1}-${code2}-${code3}-${code4}`})
res.json({status: true, message: "sucess", code: `${code1}-${code2}-${code3}-${code4}`})
})
app.get("/join/:groupInvite" , async (req , res) =>{
let link = req.params.groupInvite ? req.params.groupInvite.split("https://").join("").split("http://").join("").split("discord.gg/").join("").split("discordapp.gg/").join("") : null


if(!link) {
return res.sendStatus(400).json({message: "this link is not found!"})
}


fetch(encodeURI('https://discord.com/api/invites/' + link), {
        method: 'post',
        headers: { 'Content-Type': 'application/json' , authorization: process.env.BOT_TOKEN },
    })
    .then(res => res.json()).then(json => {

let channelName = json.channel ? json.channel.name : "NONE"


return res.json({message: `Done! I have Joined ${channelName}`})
}).catch(err =>{
return res.sendStatus(400)
})

})


app.post("/api/help/*" , async (req , res) =>{
if(!req.headers.authorization) return res.json({status:false , message: "API : Not authorizated"})
if(req.headers.authorization !== "GROUPBOT") return res.json({status:false , message: "API : Wrong authorizated"})
let data = req.body
if(!data)  return res.json({status:false , message: "API : Insert your data"})

let data_values = [
{"key": "command", "value": null},
]


for(const test of data_values) {
if(!data[test.key]) {
if(test.value !== null) {
data[test.key] = test.value
}else{
return res.json({status:false , message: "API : the value '" + test.key + "' must be found"})
}}}
const commandName = data.command
const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName)) || client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
if(!command) return res.json({status: false, message: "i can't find this command."})
res.json({status: true, message: "sucess", name: command.name, description: command.description, cooldown: command.cooldown})
})

app.post("/api/search/*", (req, res) => {
if(!req.headers.authorization) return res.json({status:false , message: "API : Not authorizated"})
if(req.headers.authorization !== "GROUPBOT") return res.json({status:false , message: "API : Worng authorizated"})
let data = req.body
if(!data)  return res.json({status:false , message: "API : Insert your data"})

let data_values = [
{"key": "command", "value": null}
]


for(const test of data_values) {
if(!data[test.key]) {
if(test.value !== null) {
data[test.key] = test.value
}else{
return res.json({status:false , message: "API : the value '" + test.key + "' must be found"})
}}}
var search = client.commands.find(r => r["name"].toLowerCase().startsWith(data.command.toLowerCase()))
if(!search) return res.json({status: false, message: "Command Not Find!"})
res.json({status: true, message: "sucess", "command": search.name})
})
app.post("/api/calculator/*", (req, res) => {
if(!req.headers.authorization) return res.json({status:false , message: "API : Not authorizated"})
if(req.headers.authorization !== "GROUPBOT") return res.json({status:false , message: "API : Worng authorizated"})
let data = req.body
if(!data)  return res.json({status:false , message: "API : Insert your data"})

let data_values = [
{"key": "cal", "value": null}
]


for(const test of data_values) {
if(!data[test.key]) {
if(test.value !== null) {
data[test.key] = test.value
}else{
return res.json({status:false , message: "API : the value '" + test.key + "' must be found"})
}}}
let args = data.cal
const almsg1 = replaceall('', '', args)
const almsg2 = replaceall('*', '', almsg1)
const almsg3 = replaceall('+', '', almsg2)
const almsg4 = replaceall('-', '', almsg3)
const almsg5 = replaceall(' ', '', almsg4)
const error = replaceall('1', '', almsg5)
const error1 = replaceall('2', '', error)
const error2 = replaceall('3', '', error1)
const error3 = replaceall('4', '', error2)
const error4 = replaceall('5', '', error3)
const error5 = replaceall('6', '', error4)
const error6 = replaceall('7', '', error5)
const error7 = replaceall('9', '', error6)
const error8 = replaceall('0', '', error7)
const error9 = replaceall(' ', '', error8)
const tmam1 = replaceall(error8, '', args)
const q = replaceall('q', '', tmam1)
const w = replaceall('w', '', q)
const e = replaceall('e', '', w)
const r = replaceall('r', '', e)
const t = replaceall('t', '', r)
const y = replaceall('y', '', t)
const u = replaceall('u', '', y)
const i = replaceall('i', '', u)
const o = replaceall('o', '', i)
const p = replaceall('p', '', o)
const a = replaceall('a', '', p)
const s = replaceall('s', '', a)
const d = replaceall('d', '', s)
const f = replaceall('f', '', d)
const g = replaceall('g', '', f)
const h = replaceall('h', '', g)
const j = replaceall('j', '', h)
const k = replaceall('k', '', j)
const l = replaceall('l', '', k)
const z = replaceall('z', '', l)
const x = replaceall('x', '', z)
const c = replaceall('c', '', x)
const v = replaceall('v', '', c)
const b = replaceall('b', '', v)
const n = replaceall('n', '', b)
const m = replaceall('m', '', n)
const tmam2 = m
const Q = replaceall('Q', '', tmam2)
const W = replaceall('W', '', Q)
const E = replaceall('E', '', W)
const R = replaceall('R', '', E)
const T = replaceall('T', '', R)
const Y = replaceall('Y', '', T)
const U = replaceall('U', '', Y)
const I = replaceall('I', '', U)
const O = replaceall('O', '', I)
const P = replaceall('P', '', O)
const A = replaceall('A', '', P)
const S = replaceall('S', '', A)
const D = replaceall('D', '', S)
const F = replaceall('F', '', D)
const G = replaceall('G', '', F)
const H = replaceall('H', '', G)
const J = replaceall('J', '', H)
const K = replaceall('K', '', J)
const L = replaceall('L', '', K)
const Z = replaceall('Z', '', L)
const X = replaceall('X', '', Z)
const C = replaceall('C', '', X)
const V = replaceall('V', '', C)
const B = replaceall('B', '', V)
const N = replaceall('N', '', B)
const M = replaceall('M', '', N)
const ss = replaceall('=', '', M)
const sss = replaceall('.', '', ss)
const ssss = replaceall('(', '', sss)
const sssss = replaceall(')', '', ssss)
const ssssss = replaceall('~', '', sssss)
const sssssss = replaceall('`', '', ssssss)
const ok = replaceall('!', '', sssssss)
const okk = replaceall('@', '', ok)
const okkk = replaceall('#', '', okk)
const okkkk = replaceall('$', '', okkk)
const okkkkk = replaceall('%', '', okkkk)
const okkkkkk = replaceall('^', '', okkkkk)
const okkkkkkk = replaceall('&', '', okkkkkk)
const okkkkkkkk = replaceall(',', '', okkkkkkk)
const lo = replaceall('[', '', okkkkkkkk)
const loo = replaceall(']', '', lo)
const looo = replaceall('؛', '', loo)
const loooo = replaceall(':', '', looo)
const as = replaceall(':', '', loooo)
const ass = replaceall('{', '', as)
const asss = replaceall('}', '', ass)
const assss = replaceall('_', '', asss)
const a5 = replaceall('"', '', assss)
const a5r = replaceall('~', '', a5)
const a5rr = replaceall('>', '', a5r)
const a5rrr = replaceall('<', '', a5rr)
const ض = replaceall('ض', '', a5rr)
const ص = replaceall('ص', '', ض)
const ث = replaceall('ث', '', ص)
const ق = replaceall('ق', '', ث)
const ف = replaceall('ف', '', ق)
const غ = replaceall('غ', '', ف)
const ع = replaceall('ع', '', غ)
const ه = replaceall('ه', '', ع)
const خ = replaceall('خ', '', ه)
const ح = replaceall('ح', '', خ)
const ش = replaceall('ش', '', ح)
const س = replaceall('س', '', ش)
const ي = replaceall('ي', '', س)
const ب = replaceall('ب', '', ي)
const ل = replaceall('ل', '', ب)
const ا = replaceall('ا', 'ا', ل)
const ت = replaceall('ت', '', ل)
const ن = replaceall('ن', '', ت)
const م = replaceall('م', '', ن)
const ئ = replaceall('ئ', '', م)
const ء = replaceall('ء', '', ئ)
const ؤ = replaceall('ؤ', '', ء)
const ر = replaceall('ر', '', ؤ)
const لا = replaceall('لا', '', ر)
const ى = replaceall('ى', '', لا)
const ة = replaceall('ة', '', ى)
const و = replaceall('و', '', ة)
const ز = replaceall('ز', '', و)
const ظ = replaceall('ظ', '', ز)
const ذ = replaceall('ذ', '', ظ)
const ج = replaceall('ج', '', ذ)
const ك = replaceall('ك', '', ج)
const د = replaceall('د', '', ك)
const الف = replaceall('ا', '', د)
const hla = replaceall(' ', '', الف)
const tmam = hla
var almsg = almsg5

if(isNaN(almsg)) {
if (tmam.length < 3) {  
return res.json({status: false, message: "Failed", number: "0004", reason: "For calculator Length +3"})
}
return res.json({status: false, message: "Failed", number: "0001", x: args, error: error9, on: tmam})
}
if(almsg.includes("e")) {
if (tmam.length < 3) {  
return res.json({status: false, message: "Failed", number: "0004", reason: "For calculator Length +3"})
}
 return res.json({status: false, message: "Failed", number: "0002", x: args, error: error9, on: tmam})
}
const question = args
if (args.length < 3) {  
return res.json({status: false, message: "Failed", number: "0003", reason: "For calculator Length +3"})
} else {
let answer;
try {
answer = math.eval(question);
} catch (err) {
return res.json({status: false, message: "Failed", number: "0005", reason: "Error Number Has Don't find"})
}
  if(answer === undefined) return res.json({status: false, message: "Failed", number: "0006", reason: "Error Number Has Don't find"})
if(answer > 99999999999999999) return res.json({status: false, message: "Failed", number: "0007", reason: "Limited Length!"})
if(answer === "Infinity") return res.json({status: false, message: "Failed", number: "0008", reason: "Error Number Has Don't find"})
res.json({status: true, message: "sucess", number: "0001", question: question, answer: answer})
}
})
const moment = require('moment')
app.post("/api/group", (req, res) => {
if(!req.headers.authorization) return res.json({status:false , message: "API : Not authorizated"})
if(req.headers.authorization !== "GROUP") return res.json({status:false , message: "API : Worng authorizated"})
let data = req.body
if(!data)  return res.json({status:false , message: "API : Insert your data"})

let data_values = [
{"key": "id", "value": null}
]


for(const test of data_values) {
if(!data[test.key]) {
if(test.value !== null) {
data[test.key] = test.value
}else{
return res.json({status:false , message: "API : the value '" + test.key + "' must be found"})
}}}
let uses = []
let prefix = ""
let timer = []
let able = true
db.get("adduse", {"groupid": data.id}).then(rows =>{
db.get("timer", {"channel": data.id }).then(row =>{
db.get("prefix", {"groupid": data.id}).then(ro =>{
for(const d of rows) uses.unshift({"use": d.use, "command": d.command})
for(const d of row) timer.unshift({"use": d.use, "timer": d.timer, "time": d.time})
if(ro.length < 1){
prefix = "$"
}else{
prefix = ro[0].prefix
}
client.getRESTChannel(data.id).catch(err=>{
able = false
}).then(async heg =>{
let timecreate = null
if(able === true) timecreate = moment(heg.createdAt).format('YYYY/M/D HH:mm:ss')
res.json({status: true,
id: data.id,
use: uses,
timer: timer,
premium: con["pre"].includes(data.id),
at: timecreate,
prefix: prefix
})
})
})
})
})
})
const ms = require('ms')
app.post("/api/membership", (req, res) => {
if(!req.headers.authorization) return res.json({status:false , message: "API : Not authorizated"})
if(req.headers.authorization !== "GROUP") return res.json({status:false , message: "API : Worng authorizated"})
let data = req.body
if(!data)  return res.json({status:false , message: "API : Insert your data"})

let data_values = [
{"key": "id", "value": null}
]


for(const test of data_values) {
if(!data[test.key]) {
if(test.value !== null) {
data[test.key] = test.value
}else{
return res.json({status:false , message: "API : the value '" + test.key + "' must be found"})
}}}
db.get("premium", {"owner": data.id}).then(async row =>{
let premiums = []
for(const d of row) {
let datas = await new Promise((res , rejj) =>{
fetch(('https://unequaled-bedecked-animantarx.glitch.me/api/test/') , {method: 'post', body: JSON.stringify({"message": d._id}), headers: { 'authorization': "GROUP", 'Content-Type': 'application/json' }, referrerPolicy: "no-referrer"}).then(async ress =>{
  let json = await ress.json();
premiums.unshift({"_id": json.message, "group": d.groupid, "endat": d.time, "endms": ms(d.time - Date.now())})
res(json)
})
})
}
res.json({status: true,
premium: premiums
})
})
})
app.post("/api/add/gay", (req, res) => {
if(!req.headers.authorization) return res.json({status:false , message: "API : Not authorizated"})
if(req.headers.authorization !== "GROUP") return res.json({status:false , message: "API : Worng authorizated"})
let data = req.body
if(!data)  return res.json({status:false , message: "API : Insert your data"})

let data_values = [
{"key": "id", "value": null}
]


for(const test of data_values) {
if(!data[test.key]) {
if(test.value !== null) {
data[test.key] = test.value
}else{
return res.json({status:false , message: "API : the value '" + test.key + "' must be found"})
}}}
     var three = Math.floor(Math.random() * 100) + 0;
db.insert("gay" , {"id": data.id, "nsabh": three})
res.json({status: true, message: "success", gay: three})
})
app.post("/api/user", (req, res) => {
if(!req.headers.authorization) return res.json({status:false , message: "API : Not authorizated"})
if(req.headers.authorization !== "GROUP") return res.json({status:false , message: "API : Worng authorizated"})
let data = req.body
if(!data)  return res.json({status:false , message: "API : Insert your data"})

let data_values = [
{"key": "id", "value": null}
]


for(const test of data_values) {
if(!data[test.key]) {
if(test.value !== null) {
data[test.key] = test.value
}else{
return res.json({status:false , message: "API : the value '" + test.key + "' must be found"})
}}}
db.get("gay", {"id": data.id}).then(rows =>{
db.get("clan", {"id": data.id}).then(rowa =>{
let nsabh = 0
let timecreate = null
let avatar = null
let claninfo = []
if(rows.length < 1){
nsabh = null
}else{
nsabh = rows[0].nsabh
}
if(rowa.length < 1){
claninfo = null
}else{
db.get("clan", {"name": rowa[0].name}).then(row =>{
var owners = []
var admins = []
var members = []
var mods = []
for(const data of row){
if(data.rank === "owner"){
owners.unshift({"id": `${data.id}`})
}
}
for(const data of row){
if(data.rank === "admin"){
admins.unshift({"id": `${data.id}`})
}
}
for(const data of row){
if(data.rank === "mod"){
mods.unshift({"id": `${data.id}`})
}
}
for(const data of row){
if(data.rank === "member"){
members.unshift({"id": `${data.id}`})
}
}
if(!members) members = `None` 
if(!mods) members = `None` 
if(!admins) admins = `None` 
if(!owners) owners = `None` 
claninfo.unshift({"name": row[0].clan, "ranked": row[0].rank, "owner": owners, admins: admins, mods: mods, members: members})
})
}
let able = true
client.getRESTUser(data.id).catch(err=>{
able = false
}).then(async heg =>{
if(able === true) avatar = heg.avatarURL
if(able === true) timecreate = moment(heg.createdAt).format('YYYY/M/D HH:mm:ss')
res.json({status: true,
gay: nsabh,
id: data.id,
marry: null,
at: timecreate,
user: heg,
avatarURL: avatar,
clan: claninfo
})
})
})
})
})

app.post("/api/untest/*", (req, res) => {
if(!req.headers.authorization) return res.json({status:false , message: "API : Not authorizated"})
if(req.headers.authorization !== "GROUP") return res.json({status:false , message: "API : Worng authorizated"})
let data = req.body
if(!data)  return res.json({status:false , message: "API : Insert your data"})

let data_values = [
{"key": "message", "value": null}
]


for(const test of data_values) {
if(!data[test.key]) {
if(test.value !== null) {
data[test.key] = test.value
}else{
return res.json({status:false , message: "API : the value '" + test.key + "' must be found"})
}}}
const message = data.message
let q = replaceall('!', 'q', message)
let Q = replaceall('=', 'Q', q)
let w = replaceall('@', 'w', Q)
let W = replaceall(')', 'W', w)
let e = replaceall('#', 'e', W)
let E = replaceall('(', 'E', e)
let r = replaceall('$', 'r', E)
let R = replaceall('{', 'R', r)
let t = replaceall('%', 't', R)
let T = replaceall('}', 'T', t)
let y = replaceall('^', 'y', T)
let Y = replaceall('~', 'Y', y)
let u = replaceall('&', 'u', T)
let U = replaceall(':', 'U', u)
let one = replaceall('ш', '1', U)
let two = replaceall(';', '2', one)
let three = replaceall('ж', '3', two)
let four = replaceall('લ', '4', three)
let fyf = replaceall('.', '5', four)
let six = replaceall('?', '6', fyf)
let sfn = replaceall('|', '7', six)
let ayt = replaceall('Я', '8', sfn)
let nyn = replaceall('ો', '9', ayt)
let f = replaceall('+', 'f', nyn)
let F = replaceall('[', 'F', f)
let b = replaceall(']', 'b', F)
let B = replaceall('Л', 'B', b)
let d = replaceall(',', 'd', B)
let D = replaceall('<', 'D', d)
let c = replaceall('>', 'c', D)
let C = replaceall('-', 'C', c)
let nas = replaceall('ф', '0', C)
let gg = replaceall('', '', nas)
const end = gg

res.json({status: true, message: end})
})
app.post("/api/test/*", (req, res) => {
if(!req.headers.authorization) return res.json({status:false , message: "API : Not authorizated"})
if(req.headers.authorization !== "GROUP") return res.json({status:false , message: "API : Worng authorizated"})
let data = req.body
if(!data)  return res.json({status:false , message: "API : Insert your data"})

let data_values = [
{"key": "message", "value": null}
]


for(const test of data_values) {
if(!data[test.key]) {
if(test.value !== null) {
data[test.key] = test.value
}else{
return res.json({status:false , message: "API : the value '" + test.key + "' must be found"})
}}}
const message = data.message
let q = replaceall('q', '!', message)
let Q = replaceall('Q', '=', q)
let w = replaceall('w', '@', Q)
let W = replaceall('W', ')', w)
let e = replaceall('e', '#', W)
let E = replaceall('E', '(', e)
let r = replaceall('r', '$', E)
let R = replaceall('R', '{', r)
let t = replaceall('t', '%', R)
let T = replaceall('T', '}', t)
let y = replaceall('y', '^', T)
let Y = replaceall('Y', '~', y)
let u = replaceall('u', '&', T)
let U = replaceall('U', ':', u)
let one = replaceall('1', 'ш', U)
let two = replaceall('2', ';', one)
let three = replaceall('3', 'ж', two)
let four = replaceall('4', 'લ', three)
let fyf = replaceall('5', '.', four)
let six = replaceall('6', '?', fyf)
let sfn = replaceall('7', '|', six)
let ayt = replaceall('8', 'Я', sfn)
let nyn = replaceall('9', 'ો', ayt)
let f = replaceall('f', '+', nyn)
let F = replaceall('F', '[', f)
let b = replaceall('b', ']', F)
let B = replaceall('B', 'Л', b)
let d = replaceall('d', ',', B)
let D = replaceall('D', '<', d)
let c = replaceall('c', '>', D)
let C = replaceall('C', '-', c)
let nas = replaceall('0', 'ф', C)
const end = nas
res.json({status: true, message: end})
})

module.exports = function() {

}