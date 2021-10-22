const Eris = require('eris');
const fs = require("fs")
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const conee = require("../node_modules/eris/lib/voice/VoiceConnection.js")

app.use(bodyParser.json());

let data = process.env

let env = process.env

console.log()
var users = []


module.exports = async function() {

let token = "NzQzODkwMjAxNzY3NzA2NjY1.YMKj7g.biwlW882bG-wsw0jUcA5xsSKHxA"
const G1 = require("../G1.eris/index.js")
let g1 = new G1();
const prefix = data.prefix

if(!token || token.length < 1) return console.log("i Can't connect to this client")

const client = new Eris(token , { restMode:true , defaultImageSize:2048 , disableEvents: ["voiceChannelJoin" , "voiceChannelSwitch" , "voiceChannelLeave" , "callCreate" , "callDelete" , "callRing" , "callUpdate"] });
client.call = undefined
client.joinCall = async (channelID) => {

if(client.call) return client.call

client.shards.get(0).sendWS(4, {
            guild_id: null,
            channel_id: channelID || null,
            self_mute: false,
            self_deaf: false
        });

let connection = new conee("call")

let connect = {
endpoint: undefined
}

await new Promise((res , rej) =>{
let func = async (raw , id) => {
if(raw.op !== 0) return;
let data = raw.d

if(raw.t === "VOICE_SERVER_UPDATE") {
connect.endpoint = data.endpoint
connect.token = data.token
connect.channel_id = data.channel_id
connect.user_id = client.user.id

if(connect.session_id) { res(connection); client.removeListener("rawWS" , func); client.call = connection }
}else
if(raw.t === "VOICE_STATE_UPDATE") {
connect.channel_id = data.channel_id
connect.session_id = data.session_id

if(connect.token) { res(connection); client.removeListener("rawWS" , func); client.call = connection }
}
}

client.on("rawWS" , func)
})

console.log(connect)



connection.connect(connect)
return connection

}

  client.on("error" , (err) => console.log(err))



var blacklistmessage = `**You/Group Have BlackListed By Senior Staff**`
var userblacklist = `**User Have BlackListed By Senior Staff**`
var timer = [26,12,9,8,8,20]
var ads = [`
اذا بتلعب ماين كرافت و جلاد 
ما عليك هنا بنضبطك
مسابقات وجوائز علي رتب وكل شي 
سيرفر ماين كرافت بي في بي
للمكركة و الاصلية
ip server : play.naarmc.net
version : 1.8 => 1.15

الالعاب الحالية : SkyPvp-PVP-1vs1-skywars-COD
حياك سيرفرهم الديسكورد : 
hhttps://discord.gg/KsR9vduc`,
`**You Need to skip all ads? 
Buy Premium \`$admins\`
600 Hour of Premium Group $0.99 Paypal - 99,999 credits [+120  Hour Free] 
300 Hour of Premium Group $0.49 Paypal - 49,999 credits [+60 Hour Free] **`,
`**MaxBot**
Ticket Bot!
Support Link https://discord.gg/xQBcgjmV
Invite Bot To You Server 
https://discord.com/api/oauth2/authorize?client_id=709400025792380988&permissions=8&scope=bot
`
]
client.on("ready", () => {
client.editStatus( "dnd" , {
name: "",
type: 0, // 0 playing , 1 stream , 2 listen , 3 watch
url: null // رابط الستريم لو فيه
  
})
console.log(`=============================`);
console.log(`Bot Group ON New`);
console.log(`=============================`);
});

const MongoClient = require("../MongoSimpleClient/index.js")
const ms = require("ms")

client.commands = new Eris.Collection()
let cooldowns = new Eris.Collection()

const commandFiles = fs.readdirSync('./client/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const db = new MongoClient("mongodb+srv://Main_DB_GroupBot:yCKSUKbd31pnQD1m@groupb.yolrs.mongodb.net/" , "GroupBot")

var top1 = require("../top/index.js");
var top = new top1(db)
console.log(await top.getall())
setInterval(() => {
top.addall()
}, 30000)
client.util = require("./utils")


client.on('messageCreate', async (message) => {//con["blacklist"].includes(message.author.id)
	if (message.author.bot) return;
let row = await db.get("prefix", {"groupid": message.channel.id})
let prefix = row[0] ? row[0].prefix : env.prefix



let rows = await db.get("adduse", {"groupid": message.channel.id})

let commandNames = message.content.split(" ")[0].toLowerCase()

let a7tholom7d = false

	let args = message.content.slice(prefix.length).trim().split(/ +/);

	let commandName = args.shift().toLowerCase();

let filter = rows.filter(d => d.use == commandNames && d.groupid == message.channel.id)


if(filter.length > 0){
commandName = filter[0].command
a7tholom7d = true
args = message.content.slice(commandNames.length).trim().split(/ +/)
}



if(a7tholom7d === false && !message.content.startsWith(prefix)) return;


const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName)) || client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	if (!command) return;


   var three = Math.floor(Math.random() * 30) + 1;
	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Eris.Collection());
	}
	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		let expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
	timestamps.set(message.author.id, now + 6000);
		return client.createMessage(message.channel.id, ` please wait **${timeLeft.toFixed(1)}** more second(s) before reusing the \`${command.name}\` command.`).then(m =>{setTimeout((c)=>{

m.delete()

      }, 3 * 1000)
}, 3 * 1000)
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(db , client , message, args);
	} catch (error) {
 		console.error(error);
		client.createMessage(message.channel.id, 'there was an error trying to execute that command!');
	}

});
client.connect();
}
