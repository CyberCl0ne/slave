const Discord = require('discord.js');
const addSchema1 = require('../models/addSchema.js');
const assets = require('../local/assets.js')

module.exports = {
    name: 'respboard',
    description: 'Shows respect leaderboard',
    aliases: ['rb','respb'],
    execute(msg){

       
        addSchema1.find({
            __v : 0
        }).sort([
            ['respect','descending']
        ]).exec((err, res) => {
            if(err) console.log(err)

            let embed = new Discord.RichEmbed()
            .setTimestamp()
            .setFooter(assets.trademark, assets.defaultImg)
            .setColor(assets.respColor)
            .setThumbnail(assets.respImg)
           
            if(res.length === 0){
                embed.setColor('RED')
                embed.addField('No data found')

            }else if(res.length < 10){
                
                for(i = 0; i < res.length; i++){
                    let member = msg.guild.members.get(res[i].userID) || "USER LEFT"
                    if(member === "USER LEFT"){
                        embed.addField(`${i + 1}. ${member}`, `**respects**: ${res[i].respect}`);
                    }else if(i + 1 == 1){
                        embed.addField(`${i + 1}. ${member.user.username} 🥇`, `**respects**: ${res[i].respect}`);
                    }else if(i + 1 == 2){
                        embed.addField(`${i + 1}. ${member.user.username} 🥈`, `**respects**: ${res[i].respect}`);
                    }else if(i + 1 == 3){
                        embed.addField(`${i + 1}. ${member.user.username} 🥉`, `**respects**: ${res[i].respect}`);
                    }else{
                        embed.addField(`${i + 1}. ${member.user.username}`, `**respects**: ${res[i].respect}`);
                    }
                }

            }else{
                var list = []
                for(i = 0; i < 10; i++){
                    let member = msg.guild.members.get(res[i].userID) || "USER LEFT"
                    if(member === "USER LEFT"){
                        list.push(` ${i + 1}. ${member} | ${res[i].respect}`); 
                    }else if(i + 1 == 1){
                        list.push(` ${i + 1}. ${member.user.username} 🥇 | ${res[i].respect}`);
                    }else if(i + 1 == 2){
                        list.push(` ${i + 1}. ${member.user.username} 🥈 | ${res[i].respect}`);
                    }else if(i + 1 == 3){
                        list.push(` ${i + 1}. ${member.user.username} 🥉 | ${res[i].respect}`);
                    }else{
                        list.push(` ${i + 1}. ${member.user.username} | ${res[i].respect}`);
                    }
                    
                }
            }
            if(userLeft === undefined){
                var userLeft = " "
            }
            embed.addField('Respect Leaderboard 🏆', list.join('\n'))
            msg.channel.send(embed);
        })
        
    }
}