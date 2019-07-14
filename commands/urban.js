const ud = require('urban-dictionary');
const Discord = require('discord.js');
const assets = require('../local/assets.js')

module.exports = {
    name: 'urban',
    description: 'Sends urban dictionary term. Command: \`?urban hello\` ',
    aliases: ['ub'],
    execute(msg, args){
       
        if(args[1] === undefined) return msg.channel.send("Use \`?urban <word>\` to find definition for the given word")
        console.log(args[1])
        function card(x, y, z){
            let embed = new Discord.RichEmbed()
            .setColor(assets.defaultColor)
            .setFooter(assets.trademark, assets.defaultImg)
            .setThumbnail(assets.udImg)
            .setTimestamp()
            .addField("Urban Dictionary", "Urban Dictionary is a crowdsourced online dictionary for slang words and phrases")
            .addField("Word", x)
            .addField("Definition", y)
            .addField("Usage", z)
            msg.channel.send(embed)

        }

        ud.term(args[1],async function (err, entries){
            if(err){
                console.log(err)
            }else{
                let word = await entries[0].word;
                let define = await entries[0].definition;
                let example = await entries[0].example;

               return card(word, define, example)
            }
        });
        
    }
}