const Discord = require('discord.js');
const moment = require('moment');
module.exports.run = async (bot, message, args) => {
  const membersembed = new Discord.MessageEmbed()
        .setTitle('Everything is Codeable')
        .setColor("#ff1b6b")
        .setThumbnail('https://cdn.simer00.repl.co/content/AccelerationStudios/Logo_T.png')
        .addField("Member Count", `This server has ${message.guild.memberCount} members`)
        .setFooter('Acceleration Studios™', 'https://cdn.simer00.repl.co/content/AccelerationStudios/Logo.png')
        .setTimestamp()
      message.channel.send(membersembed)
}

module.exports.config = {
    name: "membercount",
    aliases: ['members']
}