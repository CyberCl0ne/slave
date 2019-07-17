const Discord = require('discord.js');
const assets = require('../../local/assets.js');
const monstera = require('../../local/monster.js');
const rpgSchema = require('../../models/rpgSchema.js');
module.exports = {
    name: "battle",
    description: "fight another user",
    async execute(msg, args){
       
        var monster = monstera;

      
        function playerStats(name, attack, health, defense, xp, level, money, win, loss){
            this.name = name;
            this.attack = attack;
            this.health = health;
            this.defense = defense;
            this.xp = xp;
            this.level = level;
            this.money = money;
            this.win = win;
            this.loss = loss
        }

        function monsterStats(name, health, attack, defense, loot){
            this.name = name;
            this.health = health;
            this.attack = attack;
            this.defense = defense;
            this.loot = loot
        }

        if(args[1] == 1){
            const keys = Object.keys(monstera.level1)
            let ranIndex = keys[Math.floor(Math.random() * keys.length)];
            var ranMonster = monstera.level1[ranIndex];
        }else if(args[1] ==2){
            const keys = Object.keys(monstera.level2)
            let ranIndex = keys[Math.floor(Math.random() * keys.length)];
            var ranMonster = monstera.level2[ranIndex];
        }

        var monster = new monsterStats(ranMonster.name, ranMonster.health, ranMonster.attack, ranMonster.defense, ranMonster.loot)

        rpgSchema.findOne({ userID: msg.author.id }, async (err, res) => {
            if(err) console.log(err);

            if(!res) return msg.channel.send("It looks like you haven't created a character. Use \`?start\` to create a character.")
           
            var player = await new playerStats(res.name, res.attack, res.health, res.defense, res.xp, res.level, res.money, res.win, res.loss);
            
            if(player.level == args[1]){
                msg.channel.send("Let the battle begin")
            }else if(player != args[1]){
                return msg.channel.send("Sorry, you can't fight monster that is higher level than you.")
            }

            var result = random(player, monster)
            
            await msg.channel.send(firstCard(player, monster))
            .then(m => delay(m, secCard(player, monster), 2000))
            .then(m => delay(m, thirdCard(player, monster), 2000))
            .then(m => delay(m, lastCard(result, player, monster), 2000))
       

        })

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
                return `${a.name} has slained ${b.name}`
            }else if(result === "b"){
                return `${a.name} was killed by ${b.name}`
            }
        }

        

        function firstCard(a, b,){
            var embed = new Discord.RichEmbed()
            .setColor(assets.red)
            .addField("Fight", `${b.name} slams ${a.name} hardly 🔻 `)
           return embed
        }

        function secCard(a, b,){
            var embed = new Discord.RichEmbed()
            .setColor(assets.green)
            .addField("Fight", `${a.name} slashes ${b.name} with his magical sword 🔺 `)
           return embed
        }

        function thirdCard(a, b,){
            var embed = new Discord.RichEmbed()
            .setColor(assets.red)
            .addField("Fight", `${b.name} using its powerful move to hit ${a.name} 🔻 `)
           return embed
        }

        function lastCard(result, a, b){
            var embed = new Discord.RichEmbed()

            if(result == `${a.name} slained ${b.name}`){
                var color = assets.respColor
                var text = "You have won the battle"
            }else if(result ==  `${a.name} was killed by ${b.name}`){
                var color = assets.red
                var text = "Maybe another day"
            }
           
            embed.setColor(color)
            embed.addField(result, text)
            
            return embed
        }
      
        function delay(m, toEdit, time){
            return new Promise((resolve) => {
                setTimeout(() => {
                    m.edit(toEdit).then(m => resolve(m))
                }, time)
            });
        }

      
      
       
          
    }
}