module.exports = async (bot, message) => {
	if (message.author.bot) return;

	const messageArray = message.content.split(' ');
	const cmd = messageArray[0];
	const args = messageArray.slice(1);

	if (message.author.bot || message.channel.type === 'dm') return;
	const prefix = ".";
  atbot= {
    title: "Hey! I'm Alive!",
    description: `${message.guild.name}'s Prefix is **${prefix}**\nTo get a list of commands, **say ${prefix}help**\n[Twitter/AcceleratedDevs](https://twitter.com/AcceleratedDevs)`,
    color: 16718699,
    footer: {
      text: "Acceleration Studios™",
      icon_url: "https://cdn.simer00.repl.co/content/AccelerationStudios/Logo.png"
    },
    timestamp: new Date(),
    thumbnail: {
      url: "https://cdn.simer00.repl.co/content/AccelerationStudios/Logo_T.png"
    } 
  };

	if (message.content.match(new RegExp(`^<@!?${bot.user.id}>( |)$`))) return message.channel.send({ embed: atbot }).catch(console.error);;

	if (!message.content.startsWith(prefix)) return;
	const commandfile = bot.commands.get(cmd.slice(prefix.length).toString().toLowerCase()) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length).toString().toLowerCase()));;
	if (commandfile) {
		commandfile.run(bot, message, args);
	}

}
