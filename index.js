/**
 * Get the environment config
 */
require('dotenv').config();
const functions = require('./functions.js');
const fs        = require('fs');

/**
 * Set up the client
 */
const Discord = require('discord.js');

const { Client, RichEmbed, Message } = require('discord.js');

const bot = new Client();
const message = new Message();

/**
 * Create a new collection for commands
 */
bot.commands = new Discord.Collection();

/**
 * Import commands from external file and map to array
 */
const botCommands = require('./commands');

Object.keys(botCommands).map(key => {
    bot.commands.set(botCommands[key].name, botCommands[key]);
});

/**
 * Connect to server
 */
const TOKEN = process.env.TOKEN;

bot.login(TOKEN);

/**
 * Log in the console when the bot is online
 */
bot.on('ready', () => {

    console.info(`Logged in as ${bot.user.tag}!`);

    bot.user.setPresence({
        game: {
            name: '!commands',
            type: "LISTENING"
        }
    });

    var embed = functions.formatEmbed( new RichEmbed() );

    embed.setTitle( 'Kzzzzt. Helper has rebooted.' );

    // require('child_process').exec('ls -lct index.js', function(err, stdout) {
    //     console.log('Last commit hash on this branch is:', stdout);
    // });

    bot.channels.get( process.env.LOGS ).send( embed );
});

/**
 * On a new message, perform a command if it exists
 */
bot.on('message', message => {

    if ( message.author.id === bot.user.id ) {
        return;
    }

	const args = message.content.split(/ +/);

	let commandName = args.shift().toLowerCase();

	const command = bot.commands.get(commandName)
		|| bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type !== 'text') {
		return message.reply('I can\'t execute that command inside DMs!');
	}

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

    var embed = functions.formatEmbed( new RichEmbed() );

    console.log( command );

    // Try performing the command
    try {
        command.execute(message, args, embed);
    } catch (error) {
        console.error(error);
        message.reply('There was an error trying to execute that command!');
    }
});

bot.on('guildMemberUpdate', ( oldMember, newMember ) => {

    if ( newMember.nickname.match(/\[DM\]/g) || newMember.nickname.match(/\[RPDM\]/g) ) {
        newMember.addRole(process.env.DMROLE);
    }

    if ( !newMember.nickname.match(/\[DM\]/g) && !newMember.nickname.match(/\[RPDM\]/g) ) {
        newMember.removeRole(process.env.DMROLE);
    }

});
