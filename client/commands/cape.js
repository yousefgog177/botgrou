module.exports = {
	name: 'cape', // اسم الامر
	description: "Cape Minecraft optifine", // شرح الامر
	cooldown: 1, // الكول داون بـ الثواني
	execute: async function(db,bot ,msg , args) {
const G1 = require("../../G1.eris/index.js")
let g1 = new G1();
const fs = require("fs")
const con = JSON.parse(fs.readFileSync("./data/config.json", "utf8"))
const eris = ('eris')
const { get } = require("snekfetch");
if(!args[0]) return bot.createMessage(msg.channel.id, `I Can't find MC Name`)
get(`https://api.mojang.com/users/profiles/minecraft/${args[0]}`).then(async r =>{
if(!r) bot.createMessage(msg.channel.id, `I Can't Find This User`);
if(r.body.id){

/*bot.createMessage(msg.channel.id, {embed:{
title: `IGN: ${r.body.name}`,
      image: {

        url: ``
      }
}})*/

const got = require('got');

const url = `https://optifine.net/capes/${r.body.name}.png`;

    try {
        const response = await got(url, { responseType: 'buffer' });
        const buffer = response.body;
if(con["pre"].includes(msg.channel.id)) {
 bot.createMessage(msg.channel.id, {"embed": {
title: "Cape " + r.body.name,
url: `https://optifine.net/capes/${r.body.name}.png`,
//url: `https://optifine.net/capes/${r.body.name}.png`
}})
return bot.createMessage(msg.channel.id, ``, [{file:buffer, name: "cape.png"}])

}
bot.createMessage(msg.channel.id, `content`, [{file:buffer, name: "cape.png"}])
    } catch (error) {
        bot.createMessage(msg.channel.id, `This User No Have Cape`);
    }



}else{
bot.createMessage(msg.channel.id, `I Can't Find This User`);
}
})
	},
};
