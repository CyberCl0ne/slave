const Discord = require('discord.js');
const lvlSchema = require('../models/levelSchema.js');
const assets = require('../local/assets.js');
module.exports = {
    name: 'levelboard',
    description: 'Shows current level leaderboard',
    aliases: ['lvlb', 'lvlboard'],
    execute(msg){

      

        lvlSchema.find({ guild: msg.guild.id }).sort([
            ['level', 'descending']
        ]).exec((err, res) => {
            if(err) return console.log(err)

            let embed = new Discord.RichEmbed()
            .setColor(assets.defaultColor)
            .setTimestamp()
            .setThumbnail(assets.defaultImg)
            .setFooter(assets.trademark, assets.defaultImg)

            if(res.length === 0){
                embed.addField('No data found')
            }else if(res.length < 10){
                var list = []
                for(i = 0; i < res.length; i++){
                    let member = msg.guild.members.get(res[i].userID) || "USER LEFT"
                    if(member === "USER LEFT"){
                        list.push(`${i + 1}. ${member} | ${res[i].level}`);
                    }else if(i + 1 == 1){
                        list.push(`${i + 1}. ${member.user.username} 🥇 | ${res[i].respect}`);
                    }else if(i + 1 == 2){
                        list.push(`${i + 1}. ${member.user.username} 🥈 | ${res[i].respect}`);
                    }else if(i + 1 == 3){
                        list.push(`${i + 1}. ${member.user.username} 🥉 | ${res[i].respect}`);
                    }else{
                        list.push(`${i + 1}. ${member.user.username} | ${res[i].respect}`);
                    }
                }
            }else{
                var list = []
                var list2 = []
                for(i = 0; i < res.length; i++){
                    let member = msg.guild.members.get(res[i].userID) || "USER LEFT"
                    if(member === "USER LEFT"){
                        list.push(` ${i + 1}. ${member} | ${res[i].level}`); 
                    }else if(i + 1 == 1){
                        list.push(` ${i + 1}. ${member.user.username} 🥇 | Lvl: ${res[i].level}`);
                    }else if(i + 1 == 2){
                        list.push(` ${i + 1}. ${member.user.username} 🥈 | Lvl: ${res[i].level}`);
                    }else if(i + 1 == 3){
                        list.push(` ${i + 1}. ${member.user.username} 🥉 | Lvl: ${res[i].level}`);
                    }else{
                        list.push(` ${i + 1}. ${member.user.username} | Lvl: ${res[i].level}`);
                    }
                    
                }
            }
            if(userLeft === undefined){
                var userLeft = " "
            }
           
            embed.addField('Level Leaderboard ⚔️', list.join('\n'))
           
            msg.channel.send(embed);
        })

    }
}