module.exports = {
  name: "help",
  aliases: [],
  cooldown: 5,
  description: "لعرض قائمة الاوامر",
  execute: async (client, message, args) => {
    let embed = {
      title: "Commands List",
      color: 16711680,
      fields: [],
      thumbnail: {
        url: message.channel.guild.iconURL
      }
    };

    let diiirs = client.commands.map(a => a.dir);
    let dirs = diiirs.filter(function(item, pos) {
      return diiirs.indexOf(item) == pos;
    });

    dirs.forEach(dir => {
      let commands = client.commands.filter(c => c.dir === dir);
      if (commands.length < 1) return;

      let field = { name: `${dir.toUpperCase()} COMMANDS`, value: `` };
      let cmds = commands.map(
        c => `\`${message.prefix}${c.name}\` - **${c.description}**`
      );
      field.value = cmds.join("\n");

      embed.fields.push(field);
    });

    client.createMessage(message.channel.id, { embed: embed });
  }
};
