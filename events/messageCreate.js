module.exports = async(client, message) => {
  if(!message.guildID) return;

  let prefix = await client.fetchGuildPrefix(message.guildID);
	let args = message.content.slice(prefix.length).trim().split(/ +/);

  if(!message.content.startsWith(prefix)) return;

	let commandName = args.shift().toLowerCase();
const command = client.commands.find(cmd => cmd.name == commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName)) 
	if (!command) return;

   var three = Math.floor(Math.random() * 30) + 1;
	if (!client.cooldowns[command.name]) {
    client.cooldowns[command.name] = {}
	}

	const now = Date.now();
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (client.cooldowns[command.name][message.author.id]) {
		let expirationTime = client.cooldowns[command.name][message.author.id] + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
    	return client.createMessage(message.channel.id, ` please wait **${timeLeft.toFixed(1)}** more second(s) before reusing the \`${command.name}\` command.`).then(m =>{
setTimeout(()=>{ m.delete().catch(err => {}) }, expirationTime - now)
})
		}
	}

  client.cooldowns[command.name][message.author.id] = now
	setTimeout(() => client.cooldowns[command.name][message.author.id] = undefined, cooldownAmount);

if((command.dir === "admin" || command.dir === "websocket") && !["207553108245479434", "140509579858411521" , "535423612308422668", "453470897081286666", "265054564112269322"].includes(message.author.id)) return client.createMessage(message.channel.id, 'الادمن فقط');

	try {
    message.prefix = prefix
		command.execute(client , message, args);
	} catch (error) {
 		console.error(error);
		client.createMessage(message.channel.id, 'there was an error trying to execute that command!');
	}
};