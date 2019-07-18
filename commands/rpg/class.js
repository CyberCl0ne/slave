const mongoose = require('mongoose');
const Discord = require('discord.js');
const assets = require('../../local/assets.js');
const rpgSchema = require('../../models/rpgSchema.js');
module.exports = {
    name: 'class',
    description: 'Class for your hero to strengthen your character in RPG',
    execute(msg, args){

        var type = new Map();

        if(!args[1]){
            const embed = new Discord.RichEmbed()
            .setColor(assets.defaultColor)
            .addField("Class", "Class is one of the major component in this game. It adds attributes for you and gives you skills to increase your probability to win.")
            .addField("Swordsmen", "Ability to use sword and mainly focuses on attack. \n +10% attack")
            .addField("Archer", "Ability to use ranged weapons so the defense and health can be conserved during battle \n +5% defense \n +5% health ")
            .addField("Rogue", "Rogue has a higher chance to earn more loot than any other classes \n +10% loot")
            .addField("================================", "To choose a class use \`?class <type> \`. Remember than you cannot switch class after this.")
          return  msg.channel.send(embed)
            
        }else if(args[1].toLowerCase() == 'swordsmen'){
            type.set(msg.author.id, "Swordsmen");
        }else if(args[1].toLowerCase() == "archer"){
            type.set(msg.author.id, "Archer");
        }else if(args[1].toLowerCase() == "rogue"){
            type.set(msg.author.id, "Rogue");
        }else {
            return msg.channel.send("That is not a valid class.")
        }
        var rpClass = type.get(msg.author.id);
        rpgSchema.findOne({ userID: msg.author.id },['class','attack','health','defense'],async (err, res) => {
            if(err) console.log(err);
            if(!res) return msg.channel.send("You haven't created a character yet.");
            res.class = await rpClass;
            res.save()
            .catch(err => console.log(err))
            msg.channel.send(`Congrats, you are now in class ${rpClass}!`)
        }).catch(err => console.log(err))

        type.clear()
    }
}