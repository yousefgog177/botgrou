const fetch = require('node-fetch')
let EventEmitter = require("events");
const fs = require('fs')
var top = require("../data/top.json");
console.log(top)
var db;
 class Client extends EventEmitter {
constructor (dbs) {
  super  ()
 db = dbs
}

async get(id, channel){
 top = require("../data/top.json");
let data = top.find(d => d.id === id)
let mongodb_data = await db.get('top', {id: id, channel: channel})
if(mongodb_data.length < 1) mongodb_data = [{ xp: 0 }]
if(!data) return {xp: mongodb_data[0].xp}
return { xp: mongodb_data[0].xp + data.xp }
}

async getall(channel){
 top = require("../data/top.json");
var users = []
let allusers = await db.get('top', {channel: channel})
for(const mongodb_data of allusers){
if(!users.find(d => d.id === mongodb_data.id)){
let data = top.find(d => d.id === mongodb_data.id)
if(!data){
users.unshift({
channel: mongodb_data.channel,
id: mongodb_data.id,
xp: mongodb_data.xp
})
}else{
users.unshift({
channel: mongodb_data.channel,
id: mongodb_data.id,
xp: data.xp + mongodb_data.xp
})
}}
}
for(const mongodb_data of top){
if(!users.find(d => d.id === mongodb_data.id)){
let data = await db.get('top', {id: mongodb_data.id })
if(data.length < 1){
users.unshift({
channel: mongodb_data.channel,
id: mongodb_data.id,
xp: mongodb_data.xp
})
}else{
users.unshift({
channel: mongodb_data.channel,
id: mongodb_data.id,
xp: data[0].xp + mongodb_data.xp
})
}}
}
return users.filter(d => d.channel === channel)

}

async addall(){
top = require("../data/top.json");
for(const data of top){
let mongodb_data = await db.get('top', {id: data.id, channel: data.channel})
if(mongodb_data.length < 1){
db.insert("top" , {"id": data.id, "xp": data.xp, channel: data.channel})
}else{
mongodb_data[0].xp = mongodb_data[0].xp + data.xp 
db.update("top", {"_id": mongodb_data[0]._id }, mongodb_data[0])
}
top = require("../data/top.json");
top.shift(data)
fs.writeFileSync("./data/top.json", JSON.stringify(top, null, 4));
}

}

async addpoint(id, num, channel){
 top = require("../data/top.json");
let data = top.find(d => d.id === id && d.channel === channel)
if(!data){
top.unshift({
channel: channel,
id: id,
xp: num
})
}else{
data.xp = data.xp + num
}
    fs.writeFileSync("./data/top.json", JSON.stringify(top, null, 4));
}

 }
module.exports = Client