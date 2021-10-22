module.exports = {
	name: 'profile', // اسم الامر
	description: "Profile In ProBot.", // شرح الامر
	cooldown: 1, // الكول داون بـ الثواني
	execute: async function(db,bot ,msg , args) {
if(!args[0]) args[0] = msg.author.id
let profile = async (id , channelID) =>{
const got = require('got');
let able = true
bot.getRESTUser(args[0]).catch(err=>{
able = false
}).then(async user =>{
if(able === false) {
var al = msg.mentions[0]
if(!al) return bot.createMessage(channelID, `User No Have Profile`);
const url = `https://api.probot.io/profile/${al.id}?.jpg`;
    try {
        const response = await got(url, { responseType: 'buffer' });
        const buffer = response.body;
return bot.createMessage(channelID, `**Profile Of ${al.username}**`, [{file:buffer, name: "profile.jpg"}])
    } catch (error) {
     return   bot.createMessage(channelID, `User No Have Profile`);
    }
}
const url = `https://api.probot.io/profile/${user.id}?.jpg`;
    try {
        const response = await got(url, { responseType: 'buffer' });
        const buffer = response.body;
 bot.createMessage(channelID, `**Profile Of ${user.username}**`, [{file:buffer, name: "profile.jpg"}])
    } catch (error) {
        bot.createMessage(channelID, `You No Have Profile`);
    }
})
}
if(!args[0]){
profile(msg.author.id, msg.channel.id)
}else{
var able = true
let user = msg.mentions[0]
if(!user) { bot.getRESTUser(args[0]).catch(err=>{
able = false
}).then(async user =>{
if(able === false) return bot.createMessage(msg.channel.id, `i can't find user`);
 profile(args[0], msg.channel.id)
})
}else{
profile(user.id , msg.channel.id)
}
}
	},
};
