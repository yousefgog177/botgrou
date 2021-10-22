const fetch = require("node-fetch")

module.exports = {
	name: 'join', 
	description: "Join group for link", 
	cooldown: 300, 
	execute: async function(db,bot ,msg , args) {
let link = args[0] ? args[0].split("https://").join("").split("http://").join("").split("discord.gg/").join("").split("discordapp.gg/").join("") : null

if(!args[0]) return bot.createMessage(msg.channel.id, `I Can't find link or code!`)

let invite = await bot.getInvite(link)

if(!invite) return bot.createMessage(msg.channel.id, `invalid Code!`)

//if(invite.guild || invite.channel.type !== 3) return bot.createMessage(msg.channel.id, `Groups Only!`)




fetch('https://discord.com/api/invites/' + link, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' , authorization: "NzQzODkwMjAxNzY3NzA2NjY1.YMKj7g.biwlW882bG-wsw0jUcA5xsSKHxA" },
    })
    .then(res => res.json())
    .then(json => {

let Found = json.message || false

if(Found) return bot.createMessage(msg.channel.id, json.message)

let channelName = json.channel ? json.channel.name : "NONE"


return bot.createMessage(msg.channel.id, `Done! I have Joined ${channelName}`)
});
	},
};
