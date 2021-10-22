module.exports = {
	name: 'music', 
	description: "testor", 
	cooldown: 5, 
	execute: async function(db,bot ,msg , args) {
const ytdl = require('ytdl-core');

let client = bot

let connection = await bot.joinCall(msg.channel.id)

if(args[0] === "volume"){

connection.setVolume(Number(args[1]) / 100)
client.createMessage(msg.channel.id, `**The volume has changed to: ${args[1]}/150**`)
}
if(args[0] === "play"){

let url = args.slice(1).join(" ")

client.createMessage(msg.channel.id, `**Search.. ${url}**`).then(async m =>{


let searchQuery1 = await bot.util.search(url)


if(!searchQuery1) return m.edit({
embed:{
  description:"**<:no:839305037007814656> No Results**",
  color:14226597
}})
m.edit(`**Start playing ${searchQuery1.title}**`)

if(connection.playing) {
connection.stopPlaying();
setTimeout(() => connection.play(searchQuery1.videoId ? ytdl(searchQuery1.videoId , { filter: 'audioonly' }) : "https://www.dlxfile.com/dl/alf/ahmad-abdo/singels/Dndnha.Com.Ahmad.Abdo.Elseka.Eltanya.mp3" , {voiceDataTimeout:5000 , inlineVolume: true}) , 1000)
}else{
connection.play(searchQuery1.videoId ? ytdl(searchQuery1.videoId , { filter: 'audioonly' }) : "https://www.dlxfile.com/dl/alf/ahmad-abdo/singels/Dndnha.Com.Ahmad.Abdo.Elseka.Eltanya.mp3" , {voiceDataTimeout:5000 , inlineVolume: true})
}

connection.on("start" , () =>{
console.log("Started")
})

})
}



}}