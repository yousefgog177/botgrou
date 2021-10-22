var { MongoClient } = require('mongodb');

module.exports = {
	name: 'uno', // اسم الامر
	description: "uno game double", // شرح الامر
	cooldown: 1, // الكول داون بـ الثواني
	execute: async function(db,bot ,msg , args) {

db.get("uno", {}).then(rows =>{
var edit = true
setTimeout((c)=>{
console.log(edit)

if(edit === false) return;
db.get("uno", {}).then(row =>{
for(const data of row){
var able = true
let channel = bot.getRESTChannel(data.channel).catch(err =>{
able = false
}).then(m =>{
if(!able) return;
m.messages.get(data.player1.message).then(d =>{
var reds = data.player1.red
var red1 = ``
for(const dats of reds) red1 = red1 + `${dats}, `
var yellows = data.player1.yellow
var yellow1 = ``
for(const dats of yellows) yellow1 = yellow1 + `${dats}, `
var blues = data.player1.blue
var blue1 = ``
for(const dats of blues) blue1 = blue1 + `${dats}, `
var greens = data.player1.green
var green1 = ``
for(const dats of greens) green1 = green1 + `${dats}, `
var others = data.player1.other
var other1 = ``
for(const dats of others) other1 = other1 + `${dats}, `
d.edit({
  "content": "Player One is started Play",
  "embed": 
    {
       "title": "Player One Cards!",
       "description": "Player One card's",
      "color": 5182122,
      "fields": [
        {
          "name": "Red",
          "value": red1 || "none"
        },
        {
          "name": "Yellow",
          "value": yellow1 || "none"
        },
        {
          "name": "blue",
          "value": blue1 || "none"
        },
        {
          "name": "Green",
          "value": green1 || "none"
        },
        {
          "name": "Other",
          "value": other1 || "none"
        }
        ]
    }
})
})
m.messages.get(data.player2.message).then(d =>{
var reds = data.player2.red
var red2 = ``
for(const dats of reds) red2 = red2 + `${dats}, `
var yellows = data.player2.yellow
var yellow2 = ``
for(const dats of yellows) yellow2 = yellow2 + `${dats}, `
var blues = data.player2.blue
var blue2 = ``
for(const dats of blues) blue2 = blue2 + `${dats}, `
var greens = data.player2.green
var green2 = ``
for(const dats of greens) green2 = green2 + `${dats}, `
var others = data.player2.other
var other2 = ``
for(const dats of others) other2 = other2 + `${dats}, `
d.edit({
  "content": "Player Two is started Play",
  "embed": 
    {
       "title": "Player Two Cards!",
       "description": "Player Two card's",
      "color": 5182122,
      "fields": [
        {
          "name": "Red",
          "value": red2 || "none"
        },
        {
          "name": "Yellow",
          "value": yellow2 || "none"
        },
        {
          "name": "blue",
          "value": blue2 || "none"
        },
        {
          "name": "Green",
          "value": green2 || "none"
        },
        {
          "name": "Other",
          "value": other2 || "none"
        }
        ]
    }
})

})
})
}
})
}, 4 * 1000)

for(const data of rows) if(data.player2.id === msg.author.id){
if(data.lastplay === 2) return bot.createMessage(msg.channel.id, `Just can play now player Two`)
let allcards = []
for(const dats of data.player2.yellow) allcards.unshift({color: "yellow", name: dats})
for(const dats of data.player2.red) allcards.unshift({color: "red", name: dats})
for(const dats of data.player2.blue) allcards.unshift({color: "blue", name: dats})
for(const dats of data.player2.other) allcards.unshift({color: "other", name: dats})
for(const dats of data.player2.green) allcards.unshift({color: "green", name: dats})

var colordn = false
for(const dats of allcards){
let num0 = Math.floor(args[0])
let name = Math.floor(dats.name)
if(dats.color === data.color && `${args[0]}` === `${dats.name}`) colordn = true
if(args[0] === '+4' && args[0] === dats.name) colordn = '+4'
if(args[0] === '+2' && args[0] === dats.name) colordn = '+2'
if(args[0] === 'edit-color' && args[0] === dats.name) colordn = 'edit-color'
if(args[0] === 'stop' && args[0] === dats.name) colordn = 'stop'
if(args[0] === '+1' && args[0] === dats.name) colordn = '+1'
if(colordn === '+1'){
let player2cards = ['1']
for(const krr of player2cards){
var to = 1
var card = Math.floor(Math.random() * 14) + 1;
console.log(card)

if(card === 1){
data.lastplay = 2
data.player2.other.push("stop")
db.update("uno", {"_id": data._id } , data)

}

if(card === 2){
data.lastplay = 2
data.player2.other.push("+2")
db.update("uno", {"_id": data._id } , data)

}

if(card === 3){
data.lastplay = 2
data.player2.other.push("+4")
db.update("uno", {"_id": data._id } , data)

}

if(card === 4){
data.lastplay = 2
data.player2.other.push("p2")
db.update("uno", {"_id": data._id } , data)

}
var color = Math.floor(Math.random() * 4) + 1;
if(card > 5){

if(color === 1) {
data.lastplay = 2
data.player2.red.push(card)
db.update("uno", {"_id": data._id } , data)
}
if(color === 2) {
data.lastplay = 2
data.player2.yellow.push(card)
db.update("uno", {"_id": data._id } , data)

}
if(color === 3) {
data.lastplay = 2
data.player1.blue.push(card)
db.update("uno", {"_id": data._id } , data)

}
if(color === 4) {
let dat = data
data.player2.green.push(card)
data.lastplay = 2
db.update("uno", {"_id": data._id } , data)

}

edit = true
}


}
msg.delete()

}

if(colordn === '+2'){

let index = data.player2.other.findIndex(d => d === "+2")
data.player2.other.splice(index , index + 1)
db.update("uno", {"_id": data._id } , data)


let player2cards = ['1','2']
for(const krr of player2cards){
var to = 1
var card = Math.floor(Math.random() * 14) + 1;
console.log(card)

if(card === 1){
data.lastplay = 1
data.player1.other.push("stop")
db.update("uno", {"_id": data._id } , data)

}

if(card === 2){
data.lastplay = 2
data.player1.other.push("+2")
db.update("uno", {"_id": data._id } , data)

}

if(card === 3){
data.lastplay = 2
data.player1.other.push("+4")
db.update("uno", {"_id": data._id } , data)

}

if(card === 4){
data.lastplay = 2
data.player1.other.push("p2")
db.update("uno", {"_id": data._id } , data)

}
var color = Math.floor(Math.random() * 4) + 1;
if(card > 5){

if(color === 1) {
data.lastplay = 2
data.player1.red.push(card)
db.update("uno", {"_id": data._id } , data)
}
if(color === 2) {
data.lastplay = 2
data.player1.yellow.push(card)
db.update("uno", {"_id": data._id } , data)

}
if(color === 3) {
data.lastplay = 2
data.player1.blue.push(card)
db.update("uno", {"_id": data._id } , data)

}
if(color === 4) {
let dat = data
data.player1.green.push(card)
data.lastplay = 2
db.update("uno", {"_id": data._id } , data)

}

edit = true
}


}
}

if(colordn === 'edit-color'){
if(!args[1]) return bot.createMessage(msg.channel.id, `use: !uno edit-color [color]`)
if(args[1] !== "yellow" && args[1] !== "green" && args[1] !== "blue" && args[1] !== "red") return bot.createMessage(msg.channel.id, `use: !uno edit-color [color]`)
data.color = args[1]
let dat = data
let index = data.player2.other.findIndex(d => d === "edit-color")
data.player2.other.splice(index , index + 1)
data.lastplay = 2
db.update("uno", {"_id": data._id } , data)

edit = true
return msg.delete()
}
if(colordn === 'stop'){
console.log(`testing`)
let dat = data
let index = data.player2.other.findIndex(d => d === "stop")
data.player2.other.splice(index , index + 1)
data.lastplay = 2
db.update("uno", {"_id": data._id } , data)

edit = true
return bot.createMessage(msg.channel.id, `Done`)
}
if(colordn === '+4'){
if(!args[1]) return bot.createMessage(msg.channel.id, `use: !uno +4 [color]`)
if(args[1] !== "yellow" && args[1] !== "green" && args[1] !== "blue" && args[1] !== "red") return bot.createMessage(msg.channel.id, `use: !uno +4 [color]`)
data.color = args[1]
let index = data.player2.other.findIndex(d => d === "+4")
data.player2.other.splice(index , index + 1)
db.update("uno", {"_id": data._id } , data)
let player2cards = ['1','2','3','4']
for(const krr of player2cards){
var to = 1
var card = Math.floor(Math.random() * 14) + 1;

if(card === 1){
data.player1.other.push("stop")
data.lastplay = 2
db.update("uno", {"_id": data._id } , data)
edit = true

}

if(card === 2){
data.player1.other.push("+2")
data.lastplay = 2
db.update("uno", {"_id": data._id } , data)

edit = true

}

if(card === 3){
data.player1.other.push("+4")
data.lastplay = 2
db.update("uno", {"_id": data._id } , data)

edit = true

}

if(card === 4){
data.player1.other.push("p2")

data.lastplay = 2
db.update("uno", {"_id": data._id } , data)

edit = true

}
var color = Math.floor(Math.random() * 4) + 1;
if(card > 5){

if(color === 1){
 data.player1.red.push(card)
db.update("uno", {"_id": data._id } , data)
}
if(color === 2){
 data.player1.yellow.push(card)
db.update("uno", {"_id": data._id } , data)
}
if(color === 3) {
 data.player1.blue.push(card)
db.update("uno", {"_id": data._id } , data)
}
if(color === 4) {
 data.player1.green.push(card)
db.update("uno", {"_id": data._id } , data)
}
data.lastplay = 2
db.update("uno", {"_id": data._id } , data)

edit = true
}



}
}

if(colordn){

if(data.color === 'red'){
let dat = data
let index = data.player2.red.findIndex(d => d === Number(args[0]))
data.player2.red.splice(index , index + 1)
data.lastplay = 2
db.update("uno", {"_id": data._id } , data)

edit = true
return bot.createMessage(msg.channel.id, `Done`)
}

if(data.color === 'yellow'){
let dat = data
let index = data.player2.yellow.findIndex(d => d === Number(args[0]))
data.player2.yellow.splice(index , index + 1)
data.lastplay = 2
db.update("uno", {"_id": data._id } , data)

edit = true
return bot.createMessage(msg.channel.id, `Done`)
}

if(data.color === 'blue'){
let dat = data
let index = data.player2.blue.findIndex(d => d === Number(args[0]))
data.player2.blue.splice(index , index + 1)
data.lastplay = 2
db.update("uno", {"_id": data._id } , data)

edit = true
return bot.createMessage(msg.channel.id, `Done`)
}

if(data.color === 'green'){
let dat = data
let index = data.player2.green.findIndex(d => d === Number(args[0]))
data.player2.green.splice(index , index + 1)
data.lastplay = 2
db.update("uno", {"_id": data._id } , data)

edit = true
return bot.createMessage(msg.channel.id, `Done`)
}

}

}
console.log(colordn)
if(!colordn) return bot.createMessage(msg.channel.id, `Just ${data.color} !`)
data.lastplay = 2
db.update("uno", {"_id": data._id } , data)
edit = true
bot.createMessage(msg.channel.id, `Done`)
return;
}


for(const data of rows) if(data.player1.id === msg.author.id){
if(data.lastplay === 1) return bot.createMessage(msg.channel.id, `Just can play now player Two`)
let allcards = []
for(const dats of data.player1.yellow) allcards.unshift({color: "yellow", name: dats})
for(const dats of data.player1.red) allcards.unshift({color: "red", name: dats})
for(const dats of data.player1.blue) allcards.unshift({color: "blue", name: dats})
for(const dats of data.player1.other) allcards.unshift({color: "other", name: dats})
for(const dats of data.player1.green) allcards.unshift({color: "green", name: dats})

var colordn = false
for(const dats of allcards){

let num0 = Math.floor(args[0])
let name = Math.floor(dats.name)
if(dats.color === data.color && `${args[0]}` === `${dats.name}`) colordn = true
if(args[0] === '+4' && args[0] === dats.name) colordn = '+4'
if(args[0] === '+2' && args[0] === dats.name) colordn = '+2'
if(args[0] === 'edit-color' && args[0] === dats.name) colordn = 'edit-color'
if(args[0] === 'stop' && args[0] === dats.name) colordn = 'stop'
if(args[0] === '+1' && args[0] === dats.name) colordn = '+1'
if(colordn === '+1'){
let player2cards = ['1']
for(const krr of player2cards){
var to = 1
var card = Math.floor(Math.random() * 14) + 1;
console.log(card)

if(card === 1){
data.lastplay = 2
data.player2.other.push("stop")
db.update("uno", {"_id": data._id } , data)

}

if(card === 2){
data.lastplay = 2
data.player2.other.push("+2")
db.update("uno", {"_id": data._id } , data)

}

if(card === 3){
data.lastplay = 2
data.player2.other.push("+4")
db.update("uno", {"_id": data._id } , data)

}

if(card === 4){
data.lastplay = 2
data.player2.other.push("p2")
db.update("uno", {"_id": data._id } , data)

}
var color = Math.floor(Math.random() * 4) + 1;
if(card > 5){

if(color === 1) {
data.lastplay = 2
data.player2.red.push(card)
db.update("uno", {"_id": data._id } , data)
}
if(color === 2) {
data.lastplay = 2
data.player2.yellow.push(card)
db.update("uno", {"_id": data._id } , data)

}
if(color === 3) {
data.lastplay = 2
data.player1.blue.push(card)
db.update("uno", {"_id": data._id } , data)

}
if(color === 4) {
let dat = data
data.player2.green.push(card)
data.lastplay = 2
db.update("uno", {"_id": data._id } , data)

}

edit = true
}


}

}

if(colordn === '+2'){

let index = data.player1.other.findIndex(d => d === "+2")
data.player1.other.splice(index , index + 1)
db.update("uno", {"_id": data._id } , data)


let player2cards = ['1','2']
for(const krr of player2cards){
var to = 1
var card = Math.floor(Math.random() * 14) + 1;

if(card === 1){
data.player1.other.push("stop")
  db.update("uno", {"_id": data._id } , data)

}

if(card === 2){
data.player1.other.push("+2")
db.update("uno", {"_id": data._id } , data)

}

if(card === 3){
data.player1.other.push("+4")
db.update("uno", {"_id": data._id } , data)

}

if(card === 4){
data.player1.other.push("p2")
db.update("uno", {"_id": data._id } , data)

}
var color = Math.floor(Math.random() * 4) + 1;
if(card > 5){

if(color === 1) {
let dat = data
data.player2.red.push(card)
db.update("uno", {"_id": data._id } , data)
}
if(color === 2) {
let dat = data
data.player2.yellow.push(card)
db.update("uno", {"_id": data._id } , data)
}
if(color === 3) {
let dat = data
data.player2.blue.push(card)
db.update("uno", {"_id": data._id } , data)
}
if(color === 4) {
let dat = data
data.player2.green.push(card)
db.update("uno", {"_id": data._id } , data)
}
data.lastplay = 1
db.update("uno", {"_id": data._id } , data)

edit = true
}



}
return bot.createMessage(msg.channel.id, `Done`)
}

if(colordn === 'edit-color'){
if(!args[1]) return bot.createMessage(msg.channel.id, `use: !uno edit-color [color]`)
if(args[1] !== "yellow" && args[1] !== "green" && args[1] !== "blue" && args[1] !== "red") return bot.createMessage(msg.channel.id, `use: !uno edit-color [color]`)
data.color = args[1]
let dat = data
let index = data.player1.other.findIndex(d => d === "edit-color")
data.player1.other.splice(index , index + 1)
db.update("uno", {"_id": data._id } , data)
data.lastplay = 2
db.update("uno", {"_id": data._id } , data)

edit = true
return msg.delete()
}
if(colordn === 'stop'){
console.log(`testing`)
let dat = data
let index = dat.player1.other.findIndex(d => d === "stop")
data.player1.other.splice(index , index + 1)
data.lastplay = 2
db.update("uno", {"_id": data._id } , data)

edit = true
return msg.delete()
}
if(colordn === '+4'){
if(!args[1]) return bot.createMessage(msg.channel.id, `use: !uno +4 [color]`)
if(args[1] !== "yellow" && args[1] !== "green" && args[1] !== "blue" && args[1] !== "red") return bot.createMessage(msg.channel.id, `use: !uno +4 [color]`)
data.color = args[1]
let dat = data
let index = dat.player1.other.findIndex(d => d === "+4")
data.player1.other.splice(index , index + 1)
db.update("uno", {"_id": data._id } , data)
let player2cards = ['1','2','3','4']
for(const krr of player2cards){
var to = 1
var card = Math.floor(Math.random() * 14) + 1;

if(card === 1){
data.player2.other.push("stop")
data.lastplay = 1
db.update("uno", {"_id": data._id } , data)
edit = true

}

if(card === 2){
data.player2.other.push("+2")
data.lastplay = 1
db.update("uno", {"_id": data._id } , data)

edit = true

}

if(card === 3){
data.player2.other.push("+4")
data.lastplay = 1
db.update("uno", {"_id": data._id } , data)

edit = true
}

if(card === 4){
data.player2.other.push("p2")
data.lastplay = 1
db.update("uno", {"_id": data._id } , data)

edit = true
}
var color = Math.floor(Math.random() * 4) + 1;
if(card > 5){

if(color === 1){
 data.player2.red.push(card)
db.update("uno", {"_id": data._id } , data)
}
if(color === 2){

 data.player2.yellow.push(card)
db.update("uno", {"_id": data._id } , data)
}
if(color === 3) {
 data.player1.blue.push(card)
db.update("uno", {"_id": data._id } , data)
}
if(color === 4) {
 data.player2.green.push(card)
db.update("uno", {"_id": data._id } , data)
}
data.lastplay = 1
db.update("uno", {"_id": data._id } , data)

edit = true
}


}
return bot.createMessage(msg.channel.id, `Done`)
}

if(colordn){

if(data.color === 'red'){
let dat = data
let index = data.player1.red.findIndex(d => d === Number(args[0]))
data.player1.red.splice(index , index + 1)
data.lastplay = 1
db.update("uno", {"_id": data._id } , data)

edit = true
return;
}

if(data.color === 'yellow'){
console.log('why')
  let dat = data
let index = dat.player1.yellow.findIndex(d => d === Math.floor(args[0]))
data.player1.yellow.splice(index , index + 1)
data.lastplay = 1
db.update("uno", {"_id": data._id } , data)

edit = true
return;
}

if(data.color === 'blue'){
let dat = data
let index = data.player1.blue.findIndex(d => d === Number(args[0]))
data.player1.other.splice(index , index + 1)
data.lastplay = 1
db.update("uno", {"_id": data._id } , data)

edit = true
return bot.createMessage(msg.channel.id, `Done`)
}

if(data.color === 'green'){
let dat = data
let index = data.player1.green.findIndex(d => d === Number(args[0]))
data.player1.green.splice(index , index + 1)
data.lastplay = 1
db.update("uno", {"_id": data._id } , data)

edit = true
return bot.createMessage(msg.channel.id, `Done`)
}

}

}
console.log(colordn)
if(!colordn) return bot.createMessage(msg.channel.id, `Just color ${data.color} or you don't have this card!`)
data.lastplay = 1
db.update("uno", {"_id": data._id } , data)
edit = true
bot.createMessage(msg.channel.id, `Done`)
return;
}
    if(!args[0]) return bot.createMessage(msg.channel.id, `Mention any user`)
let user = msg.mentions[0] 
if(!user) return bot.createMessage(msg.channel.id, `Mention any user`)
if(user.id === msg.author.id) return bot.createMessage(msg.channel.id, `Mention any user`)
for(const data of rows) if(data.player2 === user.id || data.player1 === user.id) return bot.createMessage(msg.channel.id, `This player is already play`)
// player 1 cards:
var card1_red = []
var card1_yellow = []
var card1_blue = []
var card1_green = []
var card1_other = []

var card2_red = []
var card2_yellow = []
var card2_blue = []
var card2_green = []
var card2_other = []

let player2cards = ['1','2','3','4','5','6','7']
let player1cards = ['1','2','3','4','5','6','7']
for(const krr of player1cards){
var to = 1
var card = Math.floor(Math.random() * 14) + 1;
var color = Math.floor(Math.random() * 4) + 1;
if(card === 1 && to === 2){card2_other.unshift("stop")}
if(card === 1 && to === 1){card1_other.unshift("stop")}
if(card === 2 && to === 2){card2_other.unshift("+2")}
if(card === 2 && to === 1){card1_other.unshift("+2")}
if(card === 3 && to === 2){card2_other.unshift("+4")}
if(card === 3 && to === 1){card1_other.unshift("+4")}
if(card === 4 && to === 2){card2_other.unshift("p2")}
if(card === 4 && to === 1){card1_other.unshift("p2")}
if(card === 5 && to === 2){card2_other.unshift("edit-color")}
if(card === 5 && to === 1){card1_other.unshift("edit-color")}
if(card > 5){
if(to === 1 && color === 1) card1_red.unshift(card)
if(to === 1 && color === 2) card1_yellow.unshift(card)
if(to === 1 && color === 3) card1_green.unshift(card)
if(to === 1 && color === 4) card1_blue.unshift(card)
if(to === 2 && color === 1) card2_red.unshift(card)
if(to === 2 && color === 2) card2_yellow.unshift(card)
if(to === 2 && color === 3) card2_green.unshift(card)
if(to === 2 && color === 4) card2_blue.unshift(card)}
}
for(const krr of player2cards){
var to = 2
var card = Math.floor(Math.random() * 13) + 1;
var color = Math.floor(Math.random() * 4) + 1;
if(card === 1 && to === 2){card2_other.unshift("stop")}
if(card === 1 && to === 1){card1_other.unshift("stop")}
if(card === 2 && to === 2){card2_other.unshift("+2")}
if(card === 2 && to === 1){card1_other.unshift("+2")}
if(card === 3 && to === 2){card2_other.unshift("+4")}
if(card === 3 && to === 1){card1_other.unshift("+4")}
if(card === 4 && to === 2){card2_other.unshift("p2")}
if(card === 4 && to === 1){card1_other.unshift("p2")}
if(card > 4){
if(to === 1 && color === 1) card1_red.unshift(card)
if(to === 1 && color === 2) card1_yellow.unshift(card)
if(to === 1 && color === 3) card1_green.unshift(card)
if(to === 1 && color === 4) card1_blue.unshift(card)
if(to === 2 && color === 1) card2_red.unshift(card)
if(to === 2 && color === 2) card2_yellow.unshift(card)
if(to === 2 && color === 3) card2_green.unshift(card)
if(to === 2 && color === 4) card2_blue.unshift(card)}
}
let red1 = ``
for(const data of card1_red) red1 = red1 + `${data}, `
let yellow1 = ``
for(const data of card1_yellow) yellow1 = yellow1 + `${data}, `
let green1 = ``
for(const data of card1_green) green1 = green1 + `${data}, `
let blue1 = ``
for(const data of card1_blue) blue1 = blue1 + `${data}, `
let other1 = ``
for(const data of card1_other) other1 = other1 + `${data}, `
bot.createMessage(msg.channel.id, {
  "content": "Player One is started Play",
  "embed": 
    {
       "title": "Player One Cards!",
       "description": "Player One card's",
      "color": 5182122,
      "fields": [
        {
          "name": "Red",
          "value": red1 || "none"
        },
        {
          "name": "Yellow",
          "value": yellow1 || "none"
        },
        {
          "name": "blue",
          "value": blue1 || "none"
        },
        {
          "name": "Green",
          "value": green1 || "none"
        },
        {
          "name": "Other",
          "value": other1 || "none"
        }
],
            "footer": {
        "text": msg.channel.name,
       "icon_url": msg.channel.iconURL
      },
     "timestamp": new Date()
  
    }
}
).then(p1 =>{
let red2 = ``
for(const data of card2_red) red2 = red2 + `${data}, `
let yellow2 = ``
for(const data of card2_yellow) yellow2 = yellow2 + `${data}, `
let green2 = ``
for(const data of card2_green) green2 = green2 + `${data}, `
let blue2 = ``
for(const data of card2_blue) blue2 = blue2 + `${data}, `
let other2 = ``
for(const data of card2_other) other2 = other2 + `${data}, `
bot.createMessage(msg.channel.id, {
  "embed": 
    {
       "title": "Player Two Cards!",
       "description": "Player Two card's",
      "color": 5182122,
      "fields": [
        {
          "name": "Red",
          "value": red2 || "none"
        },
        {
          "name": "Yellow",
          "value": yellow2 || "none"
        },
        {
          "name": "blue",
          "value": blue2 || "none"
        },
        {
          "name": "Green",
          "value": green2 || "none"
        },
        {
          "name": "Other",
          "value": other2 || "none"
        }
],
            "footer": {
        "text": msg.channel.name,
       "icon_url": msg.channel.iconURL
      },
     "timestamp": new Date()
    }
}
).then(p2 =>{
db.insert("uno" , {"player1": {"id": msg.author.id, "red": card1_red, "yellow": card1_yellow,"green": card1_green,"blue": card1_blue,"other": card1_other, message: p1.id},"player2": {"id": user.id,"red": card2_red, "yellow": card2_yellow,"green": card2_green,"blue": card2_blue,"other": card2_other, message: p2.id},channel: msg.channel.id, lastplay: 2, color: "yellow"})
})
})
})
  }
}
/*
db.get("uno", {}).then(rows =>{

let row = []
let all = []
for(const data of rows){
if(data.player1.id === msg.author.id || data.player2.id === msg.author.id){
row.unshift(data)
all.unshift(data)
}else{
all.unshift(data)
}

}
var edit = false

setTimeout((c)=>{
console.log(edit)

if(edit === false) return;
for(const data of all){
edit = false  
var able = true
let channel = client.getRESTChannel(data.channel).catch(err =>{
able = false
}).then(m =>{
if(!able) return;
client.getMessage(m.id, data.player1.message).then(d =>{
var reds = data.player1.red
var red1;
for(const dats of reds) red1 = red1 + `${dats}, `
var yellows = data.player1.yellow
var yellow1;
for(const dats of yellows) yellow1 = yellow1 + `${dats}, `
var blues = data.player1.blue
var blue1;
for(const dats of blues) blue1 = blue1 + `${dats}, `
var greens = data.player1.green
var green1;
for(const dats of greens) green1 = green1 + `${dats}, `
var others = data.player1.other
var other1;
for(const dats of others) other1 = other1 + `${dats}, `
d.edit({
  "content": "Player One is started Play",
  "embed": 
    {
       "title": "Player One Cards!",
       "description": "Player One card's",
      "color": 5182122,
      "fields": [
        {
          "name": "Red",
          "value": red1 || "none"
        },
        {
          "name": "Yellow",
          "value": yellow1 || "none"
        },
        {
          "name": "blue",
          "value": blue1 || "none"
        },
        {
          "name": "Green",
          "value": green1 || "none"
        },
        {
          "name": "Other",
          "value": other1 || "none"
        }
        ]
    }
})
})
client.getMessage(m.id, data.player2.message).then(d =>{
var reds = data.player2.red
var red1;
for(const dats of reds) red1 = red1 + `${dats}, `
var yellows = data.player2.yellow
var yellow1;
for(const dats of yellows) yellow1 = yellow1 + `${dats}, `
var blues = data.player2.blue
var blue1;
for(const dats of blues) blue1 = blue1 + `${dats}, `
var greens = data.player2.green
var green1;
for(const dats of greens) green1 = green1 + `${dats}, `
var others = data.player2.other
var other1;
for(const dats of others) other1 = other1 + `${dats}, `
d.edit({
  "content": "Player One is started Play",
  "embed": 
    {
       "title": "Player One Cards!",
       "description": "Player One card's",
      "color": 5182122,
      "fields": [
        {
          "name": "Red",
          "value": red1 || "none"
        },
        {
          "name": "Yellow",
          "value": yellow1 || "none"
        },
        {
          "name": "blue",
          "value": blue1 || "none"
        },
        {
          "name": "Green",
          "value": green1 || "none"
        },
        {
          "name": "Other",
          "value": other1 || "none"
        }
        ]
    }
})
})
})
}
}, 4 * 1000)
for(const data of all) if(data.player2.id === msg.author.id){
if(data.lastplay === 2) return client.createMessage(msg.channel.id, `Just can play now player one`)
let allcards = []
for(const dats of data.player2.yellow) allcards.unshift({color: "yellow", name: dats})
for(const dats of data.player2.red) allcards.unshift({color: "red", name: dats})
for(const dats of data.player2.blue) allcards.unshift({color: "blue", name: dats})
for(const dats of data.player2.other) allcards.unshift({color: "other", name: dats})
for(const dats of data.player2.green) allcards.unshift({color: "green", name: dats})
var go = false
var kk = false
for(const dats of allcards){
console.log(dats.name)
console.log(dats.color)
if(args[0] === dats.name) go = true
if(data.color === dats.color || dats.color === "other" && dats.name === "+2" || dats.color === "other" && dats.name === "+4" || dats.color === "other" && dats.name === "edit-color") kk = true
if(dats.name === "edit-color"){
if(!args[1]) return client.createMessage(msg.channel.id, `use: !uno edit-color [color]`)
if(args[1] !== "yellow" && args[1] !== "red" && args[1] !== "green" && args[1] !== "blue") return client.createMessage(msg.channel.id, `Just yellow-red-blue-green`)
data.lastplay = 2
data.color = args[1]
db.update("uno", {"_id": data._id } , data)
db.database.db(db.DB).collection("uno").updateOne({"_id": data._id } , {
$pull: {
"player2.other": args[0]
}
})
edit = true
msg.delete()
return;
}else{
if(dats.color === "green"){
db.database.db(db.DB).collection("uno").updateOne({"_id": data._id } , {
$pull: {
"player1.green": Number(args[0])
}
})
data.lastplay = 2
db.update("uno", {"_id": data._id } , data)
var able = true
edit = true
msg.delete()
return;
}
if(dats.color === "yellow"){
db.database.db(db.DB).collection("uno").updateOne({"_id": data._id } , {
$pull: {
"player2.yellow": Number(args[0])
}
})
data.lastplay = 2
db.update("uno", {"_id": data._id } , data)
var able = true
edit = true
msg.delete()
return;
}
if(dats.color === "blue"){
db.database.db(db.DB).collection("uno").updateOne({"_id": data._id } , {
$pull: {
"player2.blue": Number(args[0])
}
})
data.lastplay = 2
db.update("uno", {"_id": data._id } , data)
var able = true
edit = true
msg.delete()
return;
}
if(dats.color === "red"){
db.database.db(db.DB).collection("uno").updateOne({"_id": data._id } , {
$pull: {
"player2.red": Number(args[0])
}
})
data.lastplay = 2
db.update("uno", {"_id": data._id } , data)
var able = true
edit = true
msg.delete()
return;
}


}
}
if(kk === true || go === false) return client.createMessage(msg.channel.id, `Just ${data.color} color`)
return;
}
for(const data of all) if(data.player1.id === msg.author.id){
if(data.lastplay === 1) return client.createMessage(msg.channel.id, `Just can play now player two`)
let allcards = []
for(const dats of data.player1.yellow) allcards.unshift({color: "yellow", name: dats})
for(const dats of data.player1.red) allcards.unshift({color: "red", name: dats})
for(const dats of data.player1.blue) allcards.unshift({color: "blue", name: dats})
for(const dats of data.player1.other) allcards.unshift({color: "other", name: dats})
for(const dats of data.player1.green) allcards.unshift({color: "green", name: dats})
var go = false
var kk = false
for(const dats of allcards){
console.log(dats.name)

if(args[0] === dats.name) go = true
if(data.color === dats.color || dats.color === "other" && dats.name === "+2" || dats.color === "other" && dats.name === "+4" || dats.color === "other" && dats.name === "edit-color") kk = true
if(dats.name === "edit-color" && args[0] === "edit-color"){
if(!args[1]) return client.createMessage(msg.channel.id, `use: !uno edit-color [color]`)
if(args[1] !== "yellow" && args[1] !== "red" && args[1] !== "green" && args[1] !== "blue") return client.createMessage(msg.channel.id, `Just yellow-red-blue-green`)
data.lastplay = 1
data.color = args[1]
db.update("uno", {"_id": data._id } , data)
db.database.db(db.DB).collection("uno").updateOne({"_id": data._id } , {
$pull: {
"player1.other": args[0]
}
})
edit = true
msg.delete()

return;
}else{
if(dats.color === "green"){
db.database.db(db.DB).collection("uno").updateOne({"_id": data._id } , {
$pull: {
"player1.green": Number(args[0])
}
})
data.lastplay = 1
db.update("uno", {"_id": data._id } , data)
edit = true
msg.delete()
return;
}
if(dats.color === "yellow"){
db.database.db(db.DB).collection("uno").updateOne({"_id": data._id } , {
$pull: {
"player1.yellow": Number(args[0])
}
  
})
data.lastplay = 1
db.update("uno", {"_id": data._id } , data)
edit = true
msg.delete()
return;
}
if(dats.color === "blue"){
db.database.db(db.DB).collection("uno").updateOne({"_id": data._id } , {
$pull: {
"player1.blue": Number(args[0])
}
})
data.lastplay = 1
db.update("uno", {"_id": data._id } , data)
edit = true
msg.delete()
return;
}
if(dats.color === "red"){
db.database.db(db.DB).collection("uno").updateOne({"_id": data._id } , {
$pull: {
"player1.red": Number(args[0])
}
})
data.lastplay = 1
db.update("uno", {"_id": data._id } , data)
edit = true
msg.delete()
return;
}

}
}
if(kk === true) return client.createMessage(msg.channel.id, `Just ${data.color} color`)
return;
}
if(!args[0]) return client.createMessage(msg.channel.id, `Mention any user`)
let user = msg.mentions[0] 
if(!user) return client.createMessage(msg.channel.id, `Mention any user`)
if(user.id === msg.author.id) return client.createMessage(msg.channel.id, `Mention any user`)
for(const data of all) if(data.player2 === user.id || data.player1 === user.id) return client.createMessage(msg.channel.id, `This player is already play`)

// player 1 cards:
var card1_red = []
var card1_yellow = []
var card1_blue = []
var card1_green = []
var card1_other = []

var card2_red = []
var card2_yellow = []
var card2_blue = []
var card2_green = []
var card2_other = []

let player2cards = ['1','2','3','4','5','6','7']
let player1cards = ['1','2','3','4','5','6','7']
for(const krr of player1cards){
var to = 1
var card = Math.floor(Math.random() * 14) + 1;
var color = Math.floor(Math.random() * 4) + 1;
if(card === 1 && to === 2){card2_other.unshift("stop")}
if(card === 1 && to === 1){card1_other.unshift("stop")}
if(card === 2 && to === 2){card2_other.unshift("+2")}
if(card === 2 && to === 1){card1_other.unshift("+2")}
if(card === 3 && to === 2){card2_other.unshift("+4")}
if(card === 3 && to === 1){card1_other.unshift("+4")}
if(card === 4 && to === 2){card2_other.unshift("p2")}
if(card === 4 && to === 1){card1_other.unshift("p2")}
if(card === 5 && to === 2){card2_other.unshift("edit-color")}
if(card === 5 && to === 1){card1_other.unshift("edit-color")}
if(card > 5){
if(to === 1 && color === 1) card1_red.unshift(card)
if(to === 1 && color === 2) card1_yellow.unshift(card)
if(to === 1 && color === 3) card1_green.unshift(card)
if(to === 1 && color === 4) card1_blue.unshift(card)
if(to === 2 && color === 1) card2_red.unshift(card)
if(to === 2 && color === 2) card2_yellow.unshift(card)
if(to === 2 && color === 3) card2_green.unshift(card)
if(to === 2 && color === 4) card2_blue.unshift(card)}
}
for(const krr of player2cards){
var to = 2
var card = Math.floor(Math.random() * 13) + 1;
var color = Math.floor(Math.random() * 4) + 1;
if(card === 1 && to === 2){card2_other.unshift("stop")}
if(card === 1 && to === 1){card1_other.unshift("stop")}
if(card === 2 && to === 2){card2_other.unshift("+2")}
if(card === 2 && to === 1){card1_other.unshift("+2")}
if(card === 3 && to === 2){card2_other.unshift("+4")}
if(card === 3 && to === 1){card1_other.unshift("+4")}
if(card === 4 && to === 2){card2_other.unshift("p2")}
if(card === 4 && to === 1){card1_other.unshift("p2")}
if(card > 4){
if(to === 1 && color === 1) card1_red.unshift(card)
if(to === 1 && color === 2) card1_yellow.unshift(card)
if(to === 1 && color === 3) card1_green.unshift(card)
if(to === 1 && color === 4) card1_blue.unshift(card)
if(to === 2 && color === 1) card2_red.unshift(card)
if(to === 2 && color === 2) card2_yellow.unshift(card)
if(to === 2 && color === 3) card2_green.unshift(card)
if(to === 2 && color === 4) card2_blue.unshift(card)}
}
let red1 = ``
for(const data of card1_red) red1 = red1 + `${data}, `
let yellow1 = ``
for(const data of card1_yellow) yellow1 = yellow1 + `${data}, `
let green1 = ``
for(const data of card1_green) green1 = green1 + `${data}, `
let blue1 = ``
for(const data of card1_blue) blue1 = blue1 + `${data}, `
let other1 = ``
for(const data of card1_other) other1 = other1 + `${data}, `
client.createMessage(msg.channel.id, {
  "content": "Player One is started Play",
  "embed": 
    {
       "title": "Player One Cards!",
       "description": "Player One card's",
      "color": 5182122,
      "fields": [
        {
          "name": "Red",
          "value": red1 || "none"
        },
        {
          "name": "Yellow",
          "value": yellow1 || "none"
        },
        {
          "name": "blue",
          "value": blue1 || "none"
        },
        {
          "name": "Green",
          "value": green1 || "none"
        },
        {
          "name": "Other",
          "value": other1 || "none"
        }
],
            "footer": {
        "text": msg.channel.guild.name,
       "icon_url": msg.channel.guild.iconURL
      },
     "timestamp": new Date()
  
    }
}
).then(p1 =>{
let red2 = ``
for(const data of card2_red) red2 = red2 + `${data}, `
let yellow2 = ``
for(const data of card2_yellow) yellow2 = yellow2 + `${data}, `
let green2 = ``
for(const data of card2_green) green2 = green2 + `${data}, `
let blue2 = ``
for(const data of card2_blue) blue2 = blue2 + `${data}, `
let other2 = ``
for(const data of card2_other) other2 = other2 + `${data}, `
client.createMessage(msg.channel.id, {
  "embed": 
    {
       "title": "Player Two Cards!",
       "description": "Player Two card's",
      "color": 5182122,
      "fields": [
        {
          "name": "Red",
          "value": red2 || "none"
        },
        {
          "name": "Yellow",
          "value": yellow2 || "none"
        },
        {
          "name": "blue",
          "value": blue2 || "none"
        },
        {
          "name": "Green",
          "value": green2 || "none"
        },
        {
          "name": "Other",
          "value": other2 || "none"
        }
],
            "footer": {
        "text": msg.channel.guild.name,
       "icon_url": msg.channel.guild.iconURL
      },
     "timestamp": new Date()
    }
}
).then(p2 =>{
db.insert("uno" , {"player1": {"id": msg.author.id, "red": card1_red, "yellow": card1_yellow,"green": card1_green,"blue": card1_blue,"other": card1_other, message: p1.id},"player2": {"id": user.id,"red": card2_red, "yellow": card2_yellow,"green": card2_green,"blue": card2_blue,"other": card2_other, message: p2.id},channel: msg.channel.id, lastplay: 2, color: "yellow"})
})
})
})
  }
}
                                                  */