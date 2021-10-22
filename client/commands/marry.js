const { ReactionCollector, MessageCollector } = require("eris-collector");

module.exports = {
	name: 'marry', // اسم الامر
	description: "Marry", // شرح الامر
	cooldown: 1, // الكول داون بـ الثواني
	execute: async function(db, client ,message , args) {
       /* Send informative message */
if(message.mentions[0]){
let author = await message.mentions[0].getDMChannel()
        let msgs = await client.createMessage(message.channel.id, `${message.author.username} طلب يتزوجك`);
        await msgs.addReaction("✅");
 
        /* Create reaction filter */
let dn = false
client.on('messageReactionAdd', async (msg, emoji, member) =>{
if(member.id === message.mentions[0].id && msg.id === msgs.id && emoji.name === "✅"){
dn = true
db.insert('marry', {
status: 'girl',
id: message.mentions[0].id,
marry: message.author.id,
ms: 0
})
db.insert('marry', {
status: 'boy',
id: message.author.id,
marry: message.mentions[0].id,
ms: 0
})
 client.createMessage(message.channel.id, `مزتك قبلة`)
}

})/*
        let filter = (m, emoji, userID) =>{
if(emoji.name === "✅" && userID.id === message.author.id && dn === false){
dn = true
db.insert('marry', {
status: 'girl',
id: userID.id,
marry: message.author.id,
ms: 0
})
db.insert('marry', {
status: 'boy',
id: msg.author.id,
marry: userID.id,
ms: 0
})
 client.createMessage(message.channel.id, `مزتك قبلة`)
}
        }
        let collector = new ReactionCollector(client, msg, filter, {
            time: 1000 * 20,
            max: 1
        });
        collector.on("collect", (m, emoji, userID) => {
            console.log(userID);
        });*/
}else{
db.get("marry", {"id": message.author.id}).then(rows =>{
if(rows.length < 1) rows = [{
status: 'boy',
id: message.author.id,
}]
let bot = client
var able = true
bot.getRESTUser(rows[0].marry).catch(err=>{
able = false
}).then(async user =>{
if(!able) return client.createMessage(message.channel.id, `انت مش متزوج`)
let lang = {
boy: 'انت متزوج مع [marry]',
girl: 'انتي متزوجة مع [marry]'
}
return client.createMessage(message.channel.id, lang[rows[0].status].replace('[marry]', user.username || user.username))
})
})
}
	},
};
