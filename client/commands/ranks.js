module.exports = { 
	name: 'rank', // اسم الامر
	description: "rank of user", // شرح الامر
	cooldown: 5, // الكول داون بـ الثواني
	execute: async function(db,bot ,msg , args) {
var guild = true
if(!args[0]) return bot.createMessage(msg.channel.id, `Guild is defined`)
//bot.getRESTGuild(args[0]).catch(err =>{
guild = false
//}).then(async guilds=>{
//if(!guild) return bot.createMessage(msg.channel.id, `Guild is defined`)

const got = require('got');
if(!args[1]){

const url = `https://api.probot.io/rank/${args[0]}/${msg.author.id}?.png`;
    try {
        const response = await got(url, { responseType: 'buffer' });
        const buffer = response.body;
return bot.createMessage(msg.channel.id, `**Rank Of ${msg.author.username}**`, [{file:buffer, name: "rank.jpg"}])
    } catch (error) {
     return   bot.createMessage(msg.channel.id, `you No Have Rank`);
    }
return;
}
var al = msg.mentions[0]
if(!al) {
if(!args[1]) return bot.createMessage(msg.channel.id, `user is defined`)
var users = true
bot.getRESTUser(args[1]).catch(err =>{
users = false
}).then(async user =>{
if(!users) return bot.createMessage(msg.channel.id, `user is defined`)
const url = `https://api.probot.io/rank/${args[0]}/${user.id}?.png`;
    try {
        const response = await got(url, { responseType: 'buffer' });
        const buffer = response.body;
return bot.createMessage(msg.channel.id, `**Rank Of ${user.username}**`, [{file:buffer, name: "rank.jpg"}])
    } catch (error) {
     return   bot.createMessage(msg.channel.id, `User No Have Rank`);
    }
})
}else{
const url = `https://api.probot.io/rank/${args[0]}/${al.id}?.png`;
    try {
        const response = await got(url, { responseType: 'buffer' });
        const buffer = response.body;
return bot.createMessage(msg.channel.id, `**Rank Of ${al.username}**`, [{file:buffer, name: "rank.jpg"}])
    } catch (error) {
     return   bot.createMessage(msg.channel.id, `User No Have Rank`);
    }
}
	},
};
