const url = require("url");
const ytsearch = require("yt-search");
const query = require("query-to-json");
const scdl = require("soundcloud-downloader").default;
const ytdl = require('ytdl-core');
const converter = require('number-to-words');
const fetch = require("node-fetch");

const clientID = "wu1ocdB3SHro8ZtnXx7lC3Hkdte2sutY";

function vol(vol) {
          if(vol > 70) return "🔊"
         if(vol > 10) return "🔉"
       return "🔈"
      }
      function bar(precent) {

        var str = '';

        for (var i = 0; i < 12; i++) {

          let pre = precent
          let res = pre * 12;

          res = parseInt(res)

          if(i == res){
            str+="\uD83D\uDD18";
          }
          else {
            str+="▬";
          }
        }

        return str;

      }
      function formatTime(duration) {

  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = parseInt((duration / 1000) % 60),
    minutes = parseInt((duration / (1000 * 60)) % 60),
    hours = parseInt((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return (hours > 0 ? hours + ":" : "") + minutes + ":" + seconds;
}

module.exports = {
  search: async (string , arr) => {
    const uri = url.parse(string);
    try {
      let que = query.queryToJson(uri.query);
      uri.query = que;
    } catch {}
    if (
      uri.protocol &&
      uri.host &&
      uri.hostname &&
      (uri.protocol === "https:" || uri.protocol === "http:") &&
      (uri.host === "www.youtube.com" ||
        uri.host === "youtu.be" ||
        uri.host === "youtube.com" ||
        uri.host === "www.soundcloud.com" ||
        uri.host === "soundcloud.com")
    ) {
      if ((uri.host === "www.youtube.com" || uri.host === "youtube.com") && !arr) {
        if (!uri.query.list && uri.query.v) {
          let q = await ytsearch({ videoId: uri.query.v });
          return q
        } else if (uri.query.list) {
          const q = await ytsearch({ listId: uri.query.list });
          return typeof q === "object" ? Object.assign(q ,{ isList:true }) : undefined
        } else {
          return undefined;
        }
      } else if (uri.host === "youtu.be" && !arr) {
        let q = await ytsearch({ videoId: uri.path.slice(1) });
        return q
      } else if (
        (uri.host === "www.soundcloud.com" ||
        uri.host === "soundcloud.com") && !arr
      ) {
        
        return await new Promise((re, rej) => {
          scdl
            .getInfo(string, clientID)
            .then(q => {

let list = {
  type: 'sound',
  url: q.permalink_url,
  title: q.title,
  description: q.description,
  image: q.artwork_url,
  seconds: Math.floor(q.duration / 1000),
  author: {
    name: q.user.username,
    url: q.user.permalink_url
  }
}

              re(list);
            })
            .catch(err => re());
        });
      } else {
        let q = await ytsearch(string)
    if(!arr){
        if(q.videos.length < 1) { q = undefined } else { q = q.videos[0] }
    }
        return q
      }
    } else {
        let q = await ytsearch(string)
    if(!arr){
        if(q.videos.length < 1) { q = undefined } else { q = q.videos[0] }
    }
        return q
    }
  },

connectionSetup: (connection , message , voiceID , bot) =>{
      connection.now = null
			connection.songs= []
			connection.volume= 100
      connection.author= message.author.id
      connection.repeating= 0
      connection.votes = []
      connection.skip = false
			connection.textChannel = message.channel
			connection.voiceChannel = voiceID


async function pl(info){

if(info.type === "video" || info.videoId){
let stream = await ytdl(info.videoId ,  { filter: 'audioonly' })
await connection.play(stream , {voiceDataTimeout:5000 , inlineVolume: true})
}else{
let stream = await scdl.download(info.url, clientID).catch(err =>{})
await connection.play(stream, {voiceDataTimeout:5000 , inlineVolume: true})
}

connection.now = info
}

connection.on("userDisconnect" , userID =>{
connection.votes = connection.votes.filter(d => d !== userID)
})

connection.on("end" , ()=>{

connection.votes = []

if(connection.skip && connection.repeating !== 2){
if(connection.songs.length > 0){
connection.now = connection.songs[0]
pl(connection.now)
connection.songs.shift()
} else {
connection.now = null
}
}else


if(connection.repeating == 1){ 
pl(connection.now)
}else


if(connection.repeating == 2){
connection.songs.push(connection.now)
connection.now = connection.songs[0]
pl(connection.now)
connection.songs.shift()
}


else{
if(connection.songs.length > 0){
connection.now = connection.songs[0]
pl(connection.now)
connection.songs.shift()
}else{
connection.now = null
}

}


connection.skip = false
})

},

play: async(connection , searchResult , message , playnext) => {

if(connection.songs.length > 0 || connection.now || connection.playing){

if(searchResult.isList) {
 
for(let video of searchResult.videos){
video.by = message.author.id
connection.songs[playnext ? "unshift" : "push"](video)
}

}else{
connection.songs[playnext ? "unshift" : "push"](searchResult)
}

return {
type: "add",
added: searchResult.isList ? searchResult.videos.length : searchResult.title
}

}

else{
if(searchResult.isList) {

let video = searchResult.videos[0]
searchResult.videos.shift();

for(let video of searchResult.videos){
video.by = message.author.id
connection.songs[playnext ? "unshift" : "push"](video)
}

let stream = await ytdl(video.videoId , { filter: 'audioonly' })
await connection.play(stream , {voiceDataTimeout:5000 , inlineVolume: true})

connection.now = video

return {
type: "play",
song: video.title,
added: searchResult.videos.length
}

}else{

searchResult.by = message.author.id

if(searchResult.type === "video"){
let stream = await ytdl(searchResult.url ,  { filter: 'audioonly' })
await connection.play(stream , {voiceDataTimeout:5000 , inlineVolume: true})
}else{
let stream = await scdl.download(searchResult.url, clientID).catch(err =>{})
await connection.play(stream, {voiceDataTimeout:5000 , inlineVolume: true}).then(m => console.log(m))
}

connection.now = searchResult

return {
type: "play",
song: searchResult.title
} 
}

}},


vol,bar,


embedFormat: (queue) => {

        if(!queue || !queue.now) {
          return "لا يوجد شئ يعمل\n\u23F9 "+bar(-1)+" "+vol(100);
        } else if(!queue.playing) {
          return "No music playing\n\u23F9 "+bar(-1)+" "+vol(queue.volume);
        } else { 
          let progress = Number(queue.current.playTime) / Number(((queue.now.seconds) || queue.now.duration ? queue.now.duration.seconds : null) * 1000);     

  let prog = bar(progress);
          let volIcon = vol(queue.volume * 100);
          let playIcon = (queue.paused ? "\u23F8" : "\u25B6")
          let dura = formatTime(Number(((queue.now.seconds) || queue.now.duration ? queue.now.duration.seconds : null) * 1000));


          return playIcon + ' ' + prog + ' `[' + formatTime(Number(queue.current.playTime)) + '/' + dura + ']`' + volIcon;


        }
},

numberFormat: (i) =>{
        let num;

        if((i) > 9) {
          let st = `${i}`
          let n1 = converter.toWords(st[0])
          let n2 = converter.toWords(st[1])
          num = `:${n1}::${n2}:`
        }  else
        if((i) > 99) {
          let st = `${i}`
          let n1 = converter.toWords(st[0])
          let n2 = converter.toWords(st[1])
          let n3 = converter.toWords(st[2])
          num = `:${n1}::${n2}::${n3}:`
        } else {
        let n = converter.toWords(i)
        num = `:${n}:`
      }
return num
},

soundcloudSearch: (string) => {
return new Promise((re , rej) =>{
let url = encodeURI(`https://api-v2.soundcloud.com/search?q=${string}&client_id=${clientID}`)
fetch(url).catch(err =>{}).then(res => res.json()).then(async json =>{
json = json.collection.filter(d => d.kind == "track").slice(0 , 6)

let arr = []

for(let q of json) {
let list = {
  type: 'sound',
  url: q.permalink_url,
  title: q.title,
  description: q.description,
  image: q.artwork_url,
  seconds: Math.floor(q.duration / 1000),
  author: {
    name: q.user.username,
    url: q.user.permalink_url
  }
}
arr.push(list)
}


re(arr)
}).catch(err => re())
})
}


};
