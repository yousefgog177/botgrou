module.exports = {
	name: 'skin', // اسم الامر
	description: "Skin Of Minecraft Account", // شرح الامر
	cooldown: 1, // الكول داون بـ الثواني
	execute: async function(db,bot ,msg , args) {
const G1 = require("../../G1.eris/index.js")
let g1 = new G1();
const eris = ('eris')
const { get } = require("snekfetch");
if(!args[0]) return bot.createMessage(msg.channel.id, `I Can't find MC Name`)
if(args[0] === "ahmedhazem"){

get(`https://api.mojang.com/users/profiles/minecraft/emad`).then(async r =>{
if(!r) bot.createMessage(msg.channel.id, ``);
if(r.body.id){



/*bot.createMessage(msg.channel.id, {embed:{
title: `IGN: ${r.body.name}`,
      image: {

        url: ``
      }
}})*/

const got = require('got');
const url = `https://visage.surgeplay.com/full/256/${r.body.id}`;

    try {
        const response = await got(url, { responseType: 'buffer' });
        const buffer = response.body;
bot.createMessage(msg.channel.id, `**ahmedhazem**`, [{file:buffer, name: "profile.jpg"}])
    } catch (error) {
        bot.createMessage(msg.channel.id, ``);
    }

}
})
return;
}
get(`https://api.mojang.com/users/profiles/minecraft/${args[0]}`).then(async r =>{
if(!r) bot.createMessage(msg.channel.id, ``);
if(r.body.id){



/*bot.createMessage(msg.channel.id, {embed:{
title: `IGN: ${r.body.name}`,
      image: {

        url: ``
      }
}})*/

const got = require('got');
const url = `https://visage.surgeplay.com/full/256/${r.body.id}`;

    try {
        const response = await got(url, { responseType: 'buffer' });
        const buffer = response.body;
bot.createMessage(msg.channel.id, `**${r.body.name}**`, [{file:buffer, name: "profile.jpg"}])
    } catch (error) {
        bot.createMessage(msg.channel.id, `I Can't Find This User`);
    }



}else{
bot.createMessage(msg.channel.id, `I Can't Find This User`);
}
})
	},
};
