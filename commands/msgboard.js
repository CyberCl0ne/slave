const Discord = require('discord.js');
const addSchema1 = require('../models/addSchema.js');
const assets = require('../local/assets.js');

module.exports = {
    name: "msgboard",
    description: "Displays the leaderboard of messages sent",
    aliases: ['mb', 'msgb'],
    execute(msg){

        
        addSchema1.find({ __v : 0}).sort([
            ['msgSent','descending']
        ]).exec((err, res) => {
            if(err) console.log(err);

            let embed = new Discord.RichEmbed()

            .setTimestamp()
            .setColor(assets.defaultColor)
            .setFooter(assets.trademark, assets.defaultImg)
            .setThumbnail(assets.msgImg)
            
            var list = [];
            for(i = 0; i < 10; i++){
                let member = msg.guild.members.get(res[i].userID)
                list.push(`${i + 1}. ${member.user.username} | ${res[i].msgSent}`)
            }
            embed.addField('Messages sent data',list.join('\n'))
            msg.channel.send(embed);
        })
    }
}