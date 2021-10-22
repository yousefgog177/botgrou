module.exports = {
  name: "ping",
  aliases: [],
  cooldown: 5,
  description: "لعرض سرعة استجابة البوت",
  execute: async (client, message, args) => {
    client.createMessage(message.channel.id, "Pong...").then(msg => {
      msg.edit(
        `**Pong...  -  Time taken: \`${msg.timestamp -
          message.timestamp}\` ms.**`
      );
    });
  }
};
