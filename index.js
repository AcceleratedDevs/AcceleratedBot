// Simer's Bot | Acceleration Studios™ //

const Discord = require('discord.js');
const keep_alive = require('./server.js')
//const twitchbot = require('./twitch/index.js')
require('events').EventEmitter.defaultMaxListeners = 100;
const bot = new Discord.Client({
  partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});
const config = require("./config.json")
require('dotenv').config();
const { loadCommands } = require('./utils/loadCommands');
const { loadgen } = require('./utils/loadgen');
const DisTube = require('distube')

bot.distube = new DisTube(bot, { searchSongs: false, emitNewSongOnly: true });
bot.distube
  .on("playSong", (message, queue, song) => message.channel.send(
    `Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}`
  ))
  .on("addSong", (message, queue, song) => message.channel.send(
    `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
  ))
  .on("empty", message => message.channel.send(
    "Im lonely... Leaving the channel :C"))

require('./utils/loadEvents')(bot);

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.emotes = config.emoji

loadCommands(bot);
//loadgen(bot);

const verifyClaim = require('./reactionroles/verify.js');
const roleClaim = require('./reactionroles/roles.js');

//Start
bot.once("ready", () => {
  console.log(`Logged in as ${bot.user.tag}! (From Index)`);

  bot.user.setPresence({
    status: "online",  // You can show online, idle... Do not disturb is dnd
    activity: {
      name: "With Simer",  // The message shown
      type: "PLAYING" // PLAYING, WATCHING, LISTENING, STREAMING,
    }
  });
  verifyClaim(bot);
  roleClaim(bot);
});

//ping
bot.on('message', message => {
  if (message.content === '.ping') {
    message.channel.send(`🏓 Pong! Latency: ${Date.now() - message.createdTimestamp}ms. API Latency: ${Math.round(bot.ws.ping)}ms`);
    console.log("Ping was Tested!");
  }

});

//Server Info
bot.on('message', message => {
  if (message.content === '.server') {
    const channel = bot.channels.cache.get('channel id')
    server = new Discord.MessageEmbed()
      .setColor("#ff1b6b")
      .setTitle("Server Info")
      .setThumbnail("https://cdn.simerlol.repl.co/content/AccelerationStudios/Logo_T.png")
      .setDescription(`${message.guild}'s information`)
      .addField("Owner", `The owner of this server is ${message.guild.owner}`)
      .addField("Member Count", `This server has ${message.guild.memberCount} members`)
      .addField("Emoji Count", `This server has ${message.guild.emojis.cache.size} emojis`)
      .addField("Roles Count", `This server has ${message.guild.roles.cache.size} roles`)
      .setTimestamp()
      .setFooter('Acceleration Studios™', 'https://cdn.simerlol.repl.co/content/AccelerationStudios/Logo.png');
    message.channel.send({ embed: server }).catch(console.error).then(msg => {
      msg.delete({ timeout: 60000 /*time unitl delete in milliseconds*/ });
    });
    console.log("Server Command was Used!")
    return
  }
});

//Dev
bot.on('message', message => {
  if (message.content.startsWith('.dev')) {
    const channel = bot.channels.cache.get('channel id')
    invite =
      {
        title: "Bot Creation",
        description: "This Bot is the creation of Simer00\n Discord Tag: **Simer**#3994\nTwitter: /Simerlol",
        url: "https://Twitter.com/Simer00_FN",
        color: 16718699,
        footer: {
          text: "Acceleration Studios™",
          icon_url: "https://cdn.simerlol.repl.co/content/AccelerationStudios/Logo.png"
        },
        timestamp: new Date(),
        thumbnail: {
          url: "https://cdn.simerlol.repl.co/content/AccelerationStudios/Logo_T.png"
        },
      }
    message.channel.send({ embed: invite }).catch(console.error).then(msg => {
      msg.delete({ timeout: 60000 /*time unitl delete in milliseconds*/ });
    });
    console.log("Dev Command was Used!")
    return
  }
});

//Vanity Invite
bot.on('message', message => {
  if (message.content.startsWith('.vanity')) {
    const channel = bot.channels.cache.get('channel id')
    vanity =
      {
        title: "Accelerated Server",
        description: "Join Our Server...\nBecome a legend....\nCopy paste **RrtS65F** or use the link above!",
        url: "https://discord.com/invite/RrtS65F",
        color: 16718699,
        footer: {
          text: "Acceleration Studios™",
          icon_url: "https://cdn.simerlol.repl.co/content/AccelerationStudios/Logo.png"
        },
        timestamp: new Date(),
        thumbnail: {
          url: "https://cdn.simerlol.repl.co/content/AccelerationStudios/Logo_T.png"
        },
      }
    message.channel.send({ embed: vanity }).catch(console.error);
    return
  }
});

//socials  
bot.on('message', message => {
  if (message.content === '.socials') {
    const channel = bot.channels.cache.get('channel id')
    socials =
      {
        title: "<a:butterflies:793842613581119498> 𝘚𝘰𝘤𝘪𝘢𝘭𝘴",
        color: 16718699,
        fields: [
          {
            name: "<a:heart:793842366729289738> Youtube",
            value: "[<a:right:793842799736127498> Subscribe](https://www.youtube.com/channel/UCqLJbcXGRbX_SCOUi3DWtbA?sub_confirmation=1)",
            inline: true
          },
          {
            name: "<a:heart:793842366729289738>  Tiktok",
            value: "[<a:right:793842799736127498> Follow ](https://www.tiktok.com/@AcceleratedDevs?)",
            inline: true
          },
          {
            name: "<a:heart:793842366729289738>  Twitter",
            value: "[<a:right:793842799736127498> Follow](https://twitter.com/AcceleratedDevs)",
            inline: true
          },
          {
            name: "<a:heart:793842366729289738>  GitHub",
            value: "[<a:right:793842799736127498> Visit](https://github.com/AcceleratedDevs)",
            inline: true
          },
          {
            name: "Find Simer on",
            value: " **All of his Socials**",
            inline: true
          },
          {
            name: "<a:heart:793842366729289738>  Repl.it",
            value: "[<a:right:793842799736127498> Visit](https://repl.it/@Simer00/)",
            inline: true
          }
        ],
        footer: {
          text: "Acceleration Studios™",
          icon_url: "https://cdn.simerlol.repl.co/content/AccelerationStudios/Logo.png"
        },
        timestamp: new Date(),
        thumbnail: {
          url: "https://cdn.simerlol.repl.co/content/AccelerationStudios/Logo_T.png"
        }
      }

    message.channel.send({ embed: socials }).catch(console.error).then(msg => {
      msg.delete({ timeout: 60000 /*time unitl delete in milliseconds*/ });
    });
    console.log("Socials Command was Used!")
    return
  }
});

//Typing
bot.on('message', message => {
  if (message.content === '.start') {
    message.channel.startTyping();
    return console.log('Started Typing...');
  } else if (message.content === '.end') {
    message.channel.stopTyping(true);
    return console.log('Stopped Typing...');
  }
});

//Muting
bot.on('message', message => {
  if (message.content.startsWith('.mute')) {
    const target = message.mentions.members.first();
    const mutedRole = message.guild.roles.cache.get('841545811653296158');
    const verifiedRole = message.guild.roles.cache.get('722463305121398788');
    const communityRole = message.guild.roles.cache.get('722463305121398786');
    target.roles.add(mutedRole);
    target.roles.remove(verifiedRole);
    target.roles.remove(communityRole);
    message.reply(`Successfully muted ${target}, LOSER HAH!`);
    console.log(`${target.displayName} was Muted!`)
  }
});

//Un-Muting
bot.on('message', message => {
  if (message.content.startsWith('.unmute')) {
    if (!message.member.permissions.has('MANAGE_MESSAGES')) return message.reply('you dont have the permissions to do this.');

    const target = message.mentions.members.first();
    const mutedRole = message.guild.roles.cache.get('841545811653296158');
    const verifiedRole = message.guild.roles.cache.get('722463305121398788');
    const communityRole = message.guild.roles.cache.get('722463305121398786');
    target.roles.remove(mutedRole);
    target.roles.add(verifiedRole);
    target.roles.add(communityRole);
    message.reply(`Successfully unmuted ${target}!`);
    console.log(`${target.displayName} was Unmuted!`)
  }
});

//Clear
bot.on('message', message => {
  if (message.content.startsWith('.clear')) {
    const args = message.content.trim().split(/ +/g);
    if (!message.member.permissions.has('MANAGE_MESSAGES')) return message.reply('you dont have the permissions to clear messages.');
    if (!args[1]) return message.reply('Please add the number of messages to clear in the command');

    message.channel.bulkDelete(args[1]);
    message.reply(args[1] + ' messages cleared!').then(msg => {
      msg.delete({ timeout: 5000 /*time unitl delete in milliseconds*/ });
    });
    console.log(`${args[1]} messages were Cleared!`)
    return;
  }
});

//Reaction Roles
bot.on('message', message => {
  if (message.content.startsWith('.gamer')) {
    if (message.member.roles.cache.has('722463305121398790')) {
      message.channel.send('You already have Gamer!');
      console.log(`${message.member.user.username} already has Gamer!`)
    }

    else {
      const Gamer = message.guild.roles.cache.get('722463305121398790')
      message.channel.send('Added ' + Gamer.name + ' to ' + message.member.user.username + '!');
      message.member.roles.add(Gamer);
      console.log(`Gamer role was added to ${message.member.user.username}`)
    }
  }
});
bot.on('message', message => {
  if (message.content.startsWith('.streamer')) {
    if (message.member.roles.cache.has('722463305121398791')) {
      message.channel.send('You already have Streamer!');
      console.log(`${message.member.user.username} already has Streamer!`)
    }

    else {
      const Streamer = message.guild.roles.cache.get('722463305121398791')
      message.channel.send('Added ' + Streamer.name + ' to ' + message.member.user.username + '!');
      message.member.roles.add(Streamer);
      console.log(`${Streamer.name} role was added to ${message.member.user.username}`)
    }
  }
});
bot.on('message', message => {
  if (message.content.startsWith('.youtuber')) {
    if (message.member.roles.cache.has('722463305121398792')) {
      message.channel.send('You already have Youtuber!');
      console.log(`${message.member.user.username} already has Youtuber!`)
    }

    else {
      const Youtuber = message.guild.roles.cache.get('722463305121398792')
      message.channel.send('Added ' + Youtuber.name + ' to ' + message.member.user.username + '!');
      message.member.roles.add(Youtuber);
      console.log(`${Youtuber.name} role was added to ${message.member.user.username}`)

    }
  }
});
bot.on('message', message => {
  if (message.content.startsWith('.noti')) {
    if (message.member.roles.cache.has('803091410306990101')) {
      message.channel.send('You already have Noti!');
      console.log(`${message.member.user.username} already has Noti!`)
    }

    else {
      const Noti = message.guild.roles.cache.get('803091410306990101')
      message.channel.send('Added ' + Noti.name + ' to ' + message.member.user.username + '!');
      message.member.roles.add(Noti);
      console.log(`Added ${Noti.name} to ${message.member.user.username}`)
    }
  }
});
//bot.on('message', message => {
//  if (message.content.startsWith('.delnoti')) {
//    if (message.member.roles.cache.has('803091410306990101')) {
//      const Noti = message.guild.roles.cache.get('803091410306990101')
//      message.member.roles.remove(Noti);
//      message.channel.send('Removed ' + Noti.name + ' from ' + message.member.user.username + '!')
//      console.log(`Removed ${Noti.name} from ${message.member.user.username}`)
//    }
//
//    else {
//      ;
//      console.log(`${message.member.user.username} never had Noti!`)
//    }
//  }
//});

//Help
bot.on('message', message => {
  if (message.content === '.help') {
    const channel = bot.channels.cache.get('channel id')
    help =
      {
        title: "Happy Little Helper, Happily Here to Help",
        color: 16718699,
        fields: [
          {
            name: "𝘈𝘣𝘰𝘶𝘵",
            value: "Hello, **I am** <@791695743965462529>, **a helper who does** a lot of useful stuff such as **modding**!! Other than being **exceptionally good at cranking 90s** in **Fortnite Battle Royale** with my non-existing brain and body, I also **crack accounts** and **Dm it** to you!"
          },
          {
            name: "𝘗𝘳𝘦𝘧𝘪𝘹",
            value: "My prefix is  `.`"
          },
          {
            name: "𝘊𝘰𝘮𝘮𝘢𝘯𝘥𝘴",
            value: "`.ping` `.server` `.reload` `.mute` `.vanity` `.userinfo`"
          },
          {
            name: "𝘔𝘶𝘴𝘪𝘤 𝘊𝘰𝘮𝘮𝘢𝘯𝘥𝘴",
            value: "Play - `.p` `.play` `.join`\n Skip - `.n` `skip` `.next`\n Stop - `.s` `.stop` `.leave` `.dc` `.disconnect`"
          },
          {
            name: "𝘕𝘍𝘛'𝘴",
            value: "`.acc` `.gamenight` `.nft` `.roadmap` `.summit`"
          },
          {
            name: "𝘚𝘦𝘭𝘧-𝘙𝘰𝘭𝘦𝘴",
            value: "\n`.noti` - Gives you <@&803091410306990101>!\n`.gamer` -  Gives you <@&722463305121398790> !\n`.youtuber` - Gives you <@&722463305121398792>!\n`.streamer` - Gives you <@&722463305121398791>!"
          },
          {
            name: "𝘐𝘯𝘷𝘪𝘵𝘦 𝘗𝘳𝘰𝘨𝘳𝘢𝘮",
            value: "Hover Over <#722463305674915968> channel to **invite**, **edit it** and **make it infinite**"
          }
        ],
        footer: {
          text: "Acceleration Studios™",
          icon_url: "https://cdn.simerlol.repl.co/content/AccelerationStudios/Logo.png"
        },
        timestamp: new Date(),
        thumbnail: {
          url: "https://cdn.simerlol.repl.co/content/AccelerationStudios/Logo_T.png"
        }
      }

    message.channel.send({ embed: help }).catch(console.error).then(msg => {
      msg.delete({ timeout: 60000 /*time unitl delete in milliseconds*/ });
    });
    console.log("Help Command was Used!")
    return
  }
});

bot.login();