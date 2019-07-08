const assets = require('../local/assets.js');
module.exports = {
    name: 'help',
    description: 'Provides list of commands',
    execute(msg){
        const Discord = require('discord.js');
        var bot = new Discord.Client();
        let myEmoji = bot.emojis.find(emoji => emoji.name === "Malaysia");
        let sgEmoji = bot.emojis.find(emoji => emoji.name === "Singapore");
       

        const embed = new Discord.RichEmbed()
        .setTitle('Bot Commands')
        .addField('?info Malaysia', `Displays info about Malaysia team ${myEmoji}`, true )
        .addField('?info Singapore', `Displays info about Singapore team ${sgEmoji}`)
        .addField('?birthday', 'Sets your birthday', true)
        .addField('?info @user', 'Displays info about mentioned user', true)      
        .addField('?mood', 'Sets your current mood', true)
        .addField('?ping', 'Gives you ping result for the bot', true)
        .addField('?meme ?cat ?food', 'Gives you random image at particular channel only', true)
        .addField('?respect @user  ?leaderboard   📌', 'Show your gratitude by giving them respect', true)
        .addField('?shoot ?hug ?kick ?slap ?fart   📌', 'Emotes to spice up the chat', true)
        .addField('?respboard ?vcboard ?msgboard ?levelboard', 'Shows data for this server', true)
        .addField('Addition', '"📌" shows the commands that can be used in any channel')
        .setThumbnail(assets.defaultImg)
        .setTimestamp()
        .setColor(assets.defaultColor)
        .setFooter(assets.trademark, assets.defaultImg)
        return msg.channel.send(embed);
        
    }
}