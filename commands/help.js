const assets = require('../local/assets.js');
const Discord = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Provides list of commands',
    execute(msg, args){
        
        const { commands } = msg.client;
         
        var data = []
   
        const name = args[1];
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
        const emotes = ['kick', 'slap', 'fart', 'hug', 'shoot']
        
        if(args[1]){
            if(command.description) data.push(`**Description:** ${command.description}`)
            if(command.aliases){
              data.push(`\n **Aliases:** ${command.aliases} `)
            }else{
                msg.channel.send('It looks like there are no aliases for that command')
            }
            if(args[1] === emotes){
                msg.channel.send('Try it some.')
            }
            msg.channel.send(data)
        }else{
            const embed = new Discord.RichEmbed()
            .addField('Bot Commands', `To use UN[SG-MY] bot just use the prefix '?' for every command. Some commands have "options".`)
            .addField('info', `Displays info about team Malaysia or Singapore or user \n **Options:** \n • @username \n • Malaysia \n • Singapore \n *For self profile just type info*`, true )
            .addField('birthday', 'Sets your birthday \n using this format dd/mm/yyyy ', true)     
            .addField('mood', 'Sets your current mood', true)
            .addField('ping', 'Gives you ping result for the bot', true)
            .addField('meme cat food', 'Gives you random image at particular channel only', true)
            .addField('respect @user', 'Show your gratitude by giving them respect', true)
            .addField('shoot hug kick slap fart', 'Emotes to spice up the chat', )
            .addField('respboard vcboard msgboard levelboard', 'Shows data for this server',)
            .addField('urban <word>', 'Searches definition for given word in Urban Dictionary')
            .addField('Addition', 'Use \`?help <command>\` for descriptions')
            .setThumbnail(assets.defaultImg)
            .setTimestamp()
            .setColor(assets.defaultColor)
            .setFooter(assets.trademark, assets.defaultImg)
            return msg.channel.send(embed);
        }
        
    }
}