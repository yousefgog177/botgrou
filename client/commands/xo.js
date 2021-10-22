module.exports = {
	name: 'xo', // اسم الامر
	description: "XO Game", // شرح الامر
	cooldown: 1, // الكول داون بـ الثواني
	execute: async function(db,bot ,msg , args) {
return;
let xogroups = {}
const TictacSet = new Set();
let verify = require('verify');
if(!xogroups[msg.channel.id]) {
xogroups[msg.channel.id] = false
}
if(xogroups[msg.channel.id] === true) return bot.createMessage(msg.channel.id, `فيه جيم شغال ||علي بيتكم||`)
let user2 = msg.mentions[0]
if(!user2) {
let able = true
bot.getRESTUser(args[0]).catch(err=>{
able = false
}).then(async user =>{
if(able === false) return bot.createMessage(msg.channel.id, `Error I can't fin user`);

    if(user.id === "769187279746498590") return bot.createMessage(msg.channel.id, `ما ابي العب`)
                if (user.bot) return bot.createMessage(msg.channel.id, '._.البوتات ماتلعب مثل الناس');
var stats = user.id
                if (user.id === msg.author.id) return bot.createMessage(msg.channel.id, 'مايصلح تلعب مع نفسك يا نفسية ._.');


                TictacSet.add(msg.channel.id);
                try {
                        await bot.createMessage(msg.channel.id, `${user}, تقبل التحدي؟ y or n`);
xogroups[msg.channel.id] = true
                        const verification = await verify(msg.channel, user);
                        if (!verification) {
                                TictacSet.delete(msg.channel.id);
xogroups[msg.channel.id] = false
                                return bot.createMessage(msg.channel.id, 'ما يبي يلعب');
                        }
                        const sides = ['0⃣', '1⃣', '2⃣', '3⃣', '4⃣', '5⃣', '6⃣', '7⃣', '8⃣'];
      const nomor = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
                        const taken = [];
                        let userTurn = true;
                        let winner = null;
                        while (!winner && taken.length < 9) {
                                const pUser = userTurn ? msg.author : user;
                                const sign = userTurn ? '❎' : '🅾';
                                await bot.createMessage(msg.channel.id, `${pUser}, دورك أكتب رقم المكان`)
                                await bot.createMessage(msg.channel.id, `${sides[0]}${sides[1]}${sides[2]}
${sides[3]}${sides[4]}${sides[5]}
${sides[6]}${sides[7]}${sides[8]}`);

                                const filter = res => res.author.id === pUser.id && nomor.includes(res.content) && !taken.includes(res.content); 
                                const turn = await msg.channel.awaitMessages(filter, {
                                        maxMatches: 1,
                                        time: 30000
                                });
                                if (!turn.size) {
                                        await bot.createMessage(msg.channel.id, 'أنتهى الوقت المرة الجاية العب بشكل أسرع');
                                        userTurn = !userTurn;
                                        continue;
                                }
                                const choice = turn.first().content;
                                sides[Number.parseInt(choice, 10)] = sign;
                                taken.push(choice);
                                if (
                                        (sides[0] === sides[1] && sides[0] === sides[2])
                                        || (sides[0] === sides[3] && sides[0] === sides[6])
                                        || (sides[3] === sides[4] && sides[3] === sides[5])
                                        || (sides[1] === sides[4] && sides[1] === sides[7])
                                        || (sides[6] === sides[7] && sides[6] === sides[8])
                                        || (sides[2] === sides[5] && sides[2] === sides[8])
                                        || (sides[0] === sides[4] && sides[0] === sides[8])
                                        || (sides[2] === sides[4] && sides[2] === sides[6])
                                ) winner = userTurn ? msg.author : user;
                                userTurn = !userTurn;
                        
                                
                        }
                        TictacSet.delete(msg.channel.id);
                        xogroups[msg.channel.id] = false
                        return bot.createMessage(msg.channel.id, winner ? `مبرووك, ${winner}!` : 'GG مره اخرى ان شاء الله');
                } catch (err) {
                        TictacSet.delete(msg.channel.id);
                        throw err;
                }
  
  
})
}else{
var user = user2
    if(user.id === "769187279746498590") return bot.createMessage(msg.channel.id, `ما ابي العب`)
                if (user.bot) return bot.createMessage(msg.channel.id, '._.البوتات ماتلعب مثل الناس');
var stats = user.id
                if (user.id === msg.author.id) return bot.createMessage(msg.channel.id, 'مايصلح تلعب مع نفسك يا نفسية ._.');


                TictacSet.add(msg.channel.id);
                try {
                        await bot.createMessage(msg.channel.id, `${user}, تقبل التحدي؟ y or n`);
xogroups[msg.channel.id] = true
                        const verification = await verify(msg.channel, user);
                        if (!verification) {
                                TictacSet.delete(msg.channel.id);
xogroups[msg.channel.id] = false
                                return bot.createMessage(msg.channel.id,'ما يبي يلعب');
                        }
                        const sides = ['0⃣', '1⃣', '2⃣', '3⃣', '4⃣', '5⃣', '6⃣', '7⃣', '8⃣'];
      const nomor = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
                        const taken = [];
                        let userTurn = true;
                        let winner = null;
                        while (!winner && taken.length < 9) {
                                const pUser = userTurn ? msg.author : user;
                                const sign = userTurn ? '❎' : '🅾';
                                await bot.createMessage(msg.channel.id, `${pUser}, دورك أكتب رقم المكان`)
                                await bot.createMessage(msg.channel.id, `${sides[0]}${sides[1]}${sides[2]}
${sides[3]}${sides[4]}${sides[5]}
${sides[6]}${sides[7]}${sides[8]}`);

                                const filter = res => res.author.id === pUser.id && nomor.includes(res.content) && !taken.includes(res.content); 
                                const turn = await msg.channel.awaitMessages(filter, {
                                        maxMatches: 1,
                                        time: 30000
                                });
                                if (!turn.size) {
                                        await bot.createMessage(msg.channel.id, 'أنتهى الوقت المرة الجاية العب بشكل أسرع');
                                        userTurn = !userTurn;
                                        continue;
                                }
                                const choice = turn.first().content;
                                sides[Number.parseInt(choice, 10)] = sign;
                                taken.push(choice);
                                if (
                                        (sides[0] === sides[1] && sides[0] === sides[2])
                                        || (sides[0] === sides[3] && sides[0] === sides[6])
                                        || (sides[3] === sides[4] && sides[3] === sides[5])
                                        || (sides[1] === sides[4] && sides[1] === sides[7])
                                        || (sides[6] === sides[7] && sides[6] === sides[8])
                                        || (sides[2] === sides[5] && sides[2] === sides[8])
                                        || (sides[0] === sides[4] && sides[0] === sides[8])
                                        || (sides[2] === sides[4] && sides[2] === sides[6])
                                ) winner = userTurn ? msg.author : user;
                                userTurn = !userTurn;
                        
                                
                        }
                        TictacSet.delete(msg.channel.id);
                        xogroups[msg.channel.id] = false
                        return bot.createMessage(msg.channel.id, winner ? `مبرووك, ${winner}!` : 'GG مره اخرى ان شاء الله');
                } catch (err) {
                        TictacSet.delete(msg.channel.id);
                        throw err;
                }
}
	},
};
