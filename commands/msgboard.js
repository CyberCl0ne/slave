module.exports = {
    name: "msgboard",
    description: "displays the leaderboard of messages sent",
    aliases: ['ml', 'msgl'],
    execute(msg){
        const Discord = require('discord.js');
        const addSchema1 = require('../addSchema.js');

        addSchema1.find({ __v : 0}).sort([
            ['msgSent','descending']
        ]).exec((err, res) => {
            if(err) console.log(err);

            let embed = new Discord.RichEmbed()

            .setTimestamp()
            .setColor('24E2E7')
            .setFooter('UN[SG-MY]©', 'https://i.imgur.com/TnNIYK6.png')
            
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