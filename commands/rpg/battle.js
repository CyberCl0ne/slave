const Discord = require('discord.js');
const assets = require('../../local/assets.js')
module.exports = {
    name: "battle",
    description: "fight another user",
    execute(msg){
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
          
          
          
        //repeats the value a and b 
        function fillArray(value, len) { 
        if (len == 0) return [];
        var a = [value];
        while (a.length * 2 <= len) a = a.concat(a);
        if (a.length < len) a = a.concat(a.slice(0, len - a.length));
        return a;
        }
          
        function random(a, b){
        
            let totalA = a.health + a.attack + a.sword;
            let totalB = b.health + b.attack + b.sword;
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

        var result = random(a, b)

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
      
       function delay(){ {setTimeout(() => {
           console.log(1)
       }, 3000)}}

        msg.channel.send(firstCard(a,b))
        .then(delay(5000))
        .then(m => m.edit(secCard(a,b)))
        .then(delay(5000))
        .then(m => m.edit(thirdCard(a,b)))
        .then(delay(5000))
        .then(lastCard(result))
     

       
          
    }
}