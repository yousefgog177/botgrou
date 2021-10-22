const Eris = require("eris")

module.exports = async(client, packet) => {
if (packet.t === "INTERACTION_CREATE") {
const data = packet.d;
if(!data.data || data.data.component_type !== 2) return;

let channel = client.getChannel(data.channel_id)
if(!channel) return;

let message = await channel.getMessage(data.message.id) || new Eris.Message(packet.message, client)
if(!message) return;

let guild = client.guilds.get(data.guild_id)
if(!guild) return;

let member = guild.members.get(data.member.user.id) || new Eris.Member(data.member, guild, client);
if(!member) return;

client.emit("buttonClick", data.data ,message, member, { id:data.id, token:data.token })
}}