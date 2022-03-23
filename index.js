const express = require("express")
const app = express()

app.get("/", (req, res) => {
	res.send("hello hell!")
})

app.listen(3000, () => {
	console.log("Project is ready")
})

let Discord = require("discord.js");
let client = new Discord.Client();

client.on("ready", () => {
	client.user.setPresence({ activity: { name: "Playing Amoung Us"}})
})

client.on("guildMemberAdd", member => {
	if(member.guild.id === "") {
		client.channels.cache.get("936205010633629706").send(`Welcome ${member}!`)
	}
})

client.on("message", message => {
	if (message.content === "ping") {
		message.channel.send("pong");
	}
	if (message.content === "embed") {
		let embed = new Discord.MessageEmbed()
		  .setTitle("This is emebed title")
		  .setDescription("this is embed description")
		  .setColor("RANDOM")
		  .setFooter("this is embed footer");
		message.channel.send(embed);
	}
	if(message.content === "nameme") {
		let nicknames = ["dumbass", "idiot", "lord", "shit man", "good guy", "ricardo", "pink guy"]
		message.channel.send(`${nicknames[Math.floor(Math.random() * nicknames.length)]} is your new name!`)
	}
	if(message.content.startsWith("?kill")) {
		let victim = message.mentions.users.first()
		if(!victim) message.reply("Mention someone to kill")
		else {
			message.channel.send(`${victim} Died lol`)
		}
	}
	if(message.content.startsWith("!kick")) {
		if(message.member.hasPermission("KICK_MEMBERS")) {
			let member = message.mentions.members.first()
			if(!memeber) message.channel.send("Please")
			else {
				member.kick().then(mem => {
					message.channel.send(`Kicked ${mem.user.username}!`)
				})
			} 
		} else {
			message.reply("You don't have permission to do that")
		}
	}		
	if(message.content.startsWith("!ndmute")) {
		if(!message.member.hasPermission("KICK_MEMBERS")) return
		message.channel.send("You don't have perrmission to do that!")
		let role = message.guild.roles.cache.find(role => role.name === "muted")
		let member = message.mentions.members.first()
		let reason = message.content.split(" ").slice(2).join(" ")
		if(!reason) reason = "No reason specifed!"
		if(!role) return message.channel.send("You don't have muted role in your server")
		if(!member) return message.channel.send("You didn't mention a member!")
		if(member.role.cache.has(role.id)) return 
 message.channel.send("That user is muted!")
		memeber.roles.add(role)
		.then(() => {
			message.channel.send(`Sucessfully muted ${member} with reason: ${reason}`)
		})
		.catch(() => {
			message.channel.send("Oops, something went wrong!")
		})
	}
		if(message.content.startsWith("!ndunmute")) {
		if(!message.member.hasPermission("KICK_MEMBERS")) return
		message.channel.send("You don't have perrmission to do that!")
		let role = message.guild.roles.cache.find(role => role.name === "muted")
		let member = message.mentions.members.first()
		let reason = message.content.split(" ").slice(2).join(" ")
		if(!reason) reason = "No reason specifed!"
		if(!role) return message.channel.send("You don't have muted role in your server")
		if(!member) return message.channel.send("You didn't mention a member!")
		if(member.role.cache.has(role.id)) return message.channel.send("That user is not muted!")
		member.roles.remove(role)
		.then(() => {
			message.channel.send(`Sucessfully unmuted ${member} with reason: ${reason}`)
		})
		.catch(() => {
			message.channel.send("Oops, something went wrong!")
		})
	}
});

client.login("your-bot-token-goes-here")
