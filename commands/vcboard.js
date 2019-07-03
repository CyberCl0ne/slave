module.exports = {
    name: 'vcboard',
    description: 'shows data of vc time',
    execute(msg){
        const Discord = require('discord.js');
        const addSchema1 = require('../addSchema.js');

        addSchema1.find({ __v : 0 }).sort([
            ['vcTime','descending']
        ]).exec((err, res) => {
            if(err) console.log(err);

            let embed = new Discord.RichEmbed()
            .setColor('24E2E7')
            .setFooter('UN[SG-MY]©', 'https://i.imgur.com/TnNIYK6.png')

            var list = [];
            for(i = 0; i < 10 ; i++){
                let member = msg.guild.members.get(res[i].userID)
                list.push(`${i + 1}. ${member.user.username} | ${res[i].vcTime}`)

            }
            embed.addField('VC time data', list.join('\n'))
            msg.channel.send(embed);
        })
           
    }
}