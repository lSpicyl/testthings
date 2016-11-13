const Discord = require('discord.js');
const bot = new Discord.Client();

const config = require("./config.json");

bot.on('ready', () => {
  console.log('I am ready!');
});

bot.on("guildMemberAdd", member => {
  let guild = member.guild;
  guild.defaultChannel.sendMessage(`Attention ${member.user} joined this server.`);
});

bot.on("guildCreate", guild => {
  console.log(`New guild added : ${guild.name}, owned by ${guild.owner.user.username}`);
});

bot.on("presenceUpdate", (oldMember, newMember) => {
  let guild = newMember.guild;
  let playRole = guild.roles.find("name", "Playing ROBLOX");
  if(!playRole) return;

  if(newMember.user.presence.game && newMember.user.presence.game.name === "ROBLOX") {
    newMember.addRole(playRole);
  } else if(!newMember.user.presence.game && newMember.roles.has(playRole.id)) {
    newMember.removeRole(playRole);
  }
});

bot.on('message', message => {
  if(message.author.bot) return;
  if(!message.content.startsWith(config.prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(config.prefix.length);

  let args = message.content.split(" ").slice(1);

  if (command === "add") {
	  let numArray = args.map(n=> parseInt(n));
	  let total = numArray.reduce( (p, c) => p+c);

	  message.channel.sendMessage(total);
  }

  if (command === "say") {
	  message.channel.sendMessage(args.join(" "));
  }

  if (command === "ping") {
    message.channel.sendMessage('pong!');
  } else

  if (command === "status") {
	message.channel.sendMessage("Not Working");
  }

});

bot.login(config.token);
