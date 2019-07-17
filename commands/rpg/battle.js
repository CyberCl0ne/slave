const Discord = require('discord.js');
const assets = require('../../local/assets.js');
const monster = require('../../local/monster.js');
const rpgSchema = require('../../models/rpgSchema.js');
module.exports = {
    name: "battle",
    description: "fight another user",
    execute(msg, args){
        var a = {
            name: 'Superman',
            health: 100,
            attack: 50,
            sword: 20
        }
          
        var b = {
        name: 'Batman',
        health: 100,
        attack: 20,
        sword: 120
        }

        var playerStats = {}
        

        var monsterStats = {}

        rpgSchema.findOne({ userID: msg.author.id }, async (err, res) => {
            if(err) console.log(err);
           
           await playerStats.push(res)
        })
          
        //summons monster
        if(args[1] == 1){
            const keys = Object.keys(monster.level1)
            let ranIndex = keys[Math.floor(Math.random() * keys.length)];
            let ranMonster = list[ranIndex];
            monsterStats.push(ranMonster)
        }
          
        //repeats the value a and b 
        function fillArray(value, len) { 
        if (len == 0) return [];
        var a = [value];
        while (a.length * 2 <= len) a = a.concat(a);
        if (a.length < len) a = a.concat(a.slice(0, len - a.length));
        return a;
        }
          
        function random(a, b){
        
            let totalA = a.health + a.attack + a.defense;
            let totalB = b.health + b.attack + b.defense;
            var a1 = fillArray("a", totalA);
            var b1 = fillArray("b", totalB);
            
            var field = a1.concat(b1)
            
            var result = field[Math.floor(Math.random() * field.length)];
            if(result === "a"){
                return `${a.name} wins`
            }else if(result === "b"){
                return `${b.name} wins`
            }
        }

        var result = random(playerStats, monsterStats)

        function firstCard(a, b,){
            var embed = new Discord.RichEmbed()
            .setColor(assets.red)
            .addField("Fight", `${b.name} hits ${a.name} hardly 🔻 `)
           return embed
        }

        function secCard(a, b,){
            var embed = new Discord.RichEmbed()
            .setColor(assets.green)
            .addField("Fight", `${a.name} hits ${b.name} hardly 🔺 `)
           return embed
        }

        function thirdCard(a, b,){
            var embed = new Discord.RichEmbed()
            .setColor(assets.red)
            .addField("Fight", `${b.name} hits ${a.name} hardly 🔻 `)
           return embed
        }

        function lastCard(result){
            var embed = new Discord.RichEmbed()
            .setColor(assets.respColor)
            .addField(result, "Glory")
            return embed
        }
      
        function delay(m, toEdit, time){
            return new Promise((resolve) => {
                setTimeout(() => {
                    m.edit(toEdit).then(m => resolve(m))
                }, time)
            });
        }

        msg.channel.send(firstCard(playerStats, monsterStats))
        .then(m => delay(m, secCard(playerStats, monsterStats), 2000))
        .then(m => delay(m, thirdCard(playerStats, monsterStats), 2000))
        .then(m => delay(m, lastCard(result), 2000))

        console.log(playerStats.name)

     
        playerStats = []
        monsterStats = []
       
          
    }
}