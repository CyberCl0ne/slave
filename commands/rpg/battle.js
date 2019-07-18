const Discord = require('discord.js');
const assets = require('../../local/assets.js');
const monstera = require('../../local/monster.js');
const rpgSchema = require('../../models/rpgSchema.js');
const storage = require('../../local/storage.js');
module.exports = {
    name: "battle",
    description: "fight another user",
    async execute(msg, args){
       
        var monster = monstera;
        if(!args[1]) return msg.channel.send("Please provide which dungeon you want to explore. Example: \`?battle 1\`");

        var dungeon;
        const dungeon1 = [1,2,3,4,5];
        const dungeon2 = [6,7,8,9,10];

        const delay1 = Math.floor(Math.random() * 3000) + 1000;
        const delay2 = Math.floor(Math.random() * 3000) + 1000;
        const delay3 = Math.floor(Math.random() * 3000) + 1000;

      
        function playerStats(name, attack, health, defense, xp, level, money, win, lose){
            this.name = name;
            this.attack = attack;
            this.health = health;
            this.defense = defense;
            this.xp = xp; 
            this.level = level;
            this.money = money;
            this.win = win;
            this.lose = lose
        }

        function monsterStats(name, health, attack, defense, loot, image){
            this.name = name;
            this.health = health;
            this.attack = attack;
            this.defense = defense;
            this.loot = loot;
            this.image = image;
        }

        if(args[1] == 1){
          dungeon = dungeon1;
        }else if(args[1] == 2){
          dungeon = dungeon2;
        }

        if(dungeon1){
            const keys = Object.keys(monstera.level1)
            let ranIndex = keys[Math.floor(Math.random() * keys.length)];
            var ranMonster = monstera.level1[ranIndex];
        }else if(dungeon2){
            const keys = Object.keys(monstera.level2)
            let ranIndex = keys[Math.floor(Math.random() * keys.length)];
            var ranMonster = monstera.level2[ranIndex];
        }

        var monster = new monsterStats(ranMonster.name, ranMonster.health, ranMonster.attack, ranMonster.defense, ranMonster.loot, ranMonster.image)

        if(!storage.battleLimit.has(msg.author.id)){
            storage.battleLimit.set(msg.author.id, 0);
        }else if(storage.battleLimit.get(msg.author.id) >= 20){
            return msg.channel.send("You can battle 20 fights per hour");
        }else{
            rpgSchema.findOne({ userID: msg.author.id },['name','win','lose','money','health','attack','defense','xp','level','class'],async (err, res) => {
                if(err) console.log(err);
    
                if(!res) return msg.channel.send("It looks like you haven't created a character. Use \`?start\` to create a character.")
    
                if(res.class == 'Swordsmen'){
                    var attack = res.attack + (res.attack * 10 / 100);
                }else if(res.class == 'Archer'){
                    var health = res.health + (res.health * 5 / 100);
                    var defense = res.defense + (res.defense * 5 / 100);
                }else {
                    var attack = res.attack;
                    var health = res.health;
                    var defense = res.defense;
                }
               
                var player = await new playerStats(res.name, attack, health, defense, res.xp, res.level, res.money, res.win, res.lose);
                
                if(player.level >= dungeon){
                    msg.channel.send("Let the battle begin")
                }else if(player.level < dungeon){
                    return msg.channel.send("Sorry, you can't fight monster in this dungeon yet.")
                }
    
                var result = new random(player, monster)
                
                await msg.channel.send(firstCard(player, monster))
                .then(m => delay(m, secCard(player, monster), delay1))
                .then(m => delay(m, thirdCard(player, monster), delay2))
                .then(m => delay(m, fourthCard(player, monster), delay1))
                .then(m => delay(m, fifthCard(player, monster), delay2))
                .then(m => delay(m, sixthCard(player, monster), delay1))
                .then(m => delay(m, lastCard(result, player, monster), delay3))
    
                var nextLvl = player.level * 300;
    
                
    
                if(result.result == "Win"){
                    
                    res.win = res.win + 1;
                    if(res.class == 'Rogue'){
                        res.money = res.money + monster.loot + Math.floor(monster.loot * 10 / 100)
                    }else{
                        res.money = res.money + monster.loot
                    }
                    res.xp = res.xp + Math.floor(Math.random() * 25) + 5;
                    
                }else if(result.result == "Lose"){
                    res.lose = res.lose + 1;
                    res.money = res.money - Math.floor(monster.loot / 2)
                    res.xp = res.xp + Math.floor(Math.random() * 25) + 5
                }
    
                if(res.xp >= nextLvl){
                    let newLvl = res.level + 1;
                    res.level = res.level + 1;
                    res.health = res.health + 10;
                    msg.channel.send(`Esteemed lord ${player.name},you are now on level ${newLvl}`)
                }
           
                res.save()
            })
            storage.battleLimit.set(msg.author.id, storage.battleLimit.get(msg.author.id) + 1)
            
            setTimeout(() => {
                storage.battleLimit.delete(msg.author.id);
            },60 * 60 * 1000)
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
                this.loot = b.loot
                this.xp = Math.floor(Math.random() * 25) + 5
                this.text = `${a.name} has slained ${b.name}`
                this.result = "Win"
                
            }else if(result === "b"){
                this.loot = 0 - Math.floor(b.loot / 2)
                this.xp = Math.floor(Math.random() * 5) + 1
                this.text = `${a.name} was killed by ${b.name}`
                this.result = "Lose"
                
            }
            a1 = []
            a2 = []
        }

        

        function firstCard(a, b,){
            var embed = new Discord.RichEmbed()
            .setColor(assets.red)
            .addField("Fight", `${b.name} slams ${a.name} hardly 🔻 `)
            .setThumbnail(b.image)
           return embed
        }

        function secCard(a, b,){
            var embed = new Discord.RichEmbed()
            .setColor(assets.green)
            .addField("Fight", `${a.name} slashes ${b.name} with his magical sword 🔺 `)
            .setThumbnail(assets.fightingRPG)
           return embed
        }

        function thirdCard(a, b,){
            var embed = new Discord.RichEmbed()
            .setColor(assets.red)
            .addField("Fight", `${b.name} using its powerful move to hit ${a.name} 🔻 `)
            .setThumbnail(b.image)
           return embed
        }

        function fourthCard(a, b,){
            var embed = new Discord.RichEmbed()
            .setColor(assets.red)
            .addField("Fight", `${b.name} making another combo move to hit ${a.name} 🔻 `)
            .setThumbnail(b.image)
           return embed
        }

        function fifthCard(a, b,){
            var embed = new Discord.RichEmbed()
            .setColor(assets.green)
            .addField("Fight", `${a.name} managed to escape from the combo move by ${b.name} 🔺 `)
            .setThumbnail(assets.fightingRPG)
           return embed
        }

        function sixthCard(a, b,){
            var embed = new Discord.RichEmbed()
            .setColor(assets.red)
            .addField("Fight", `${b.name} is charging for its final move! 🔻 `)
            .setThumbnail(b.image)
           return embed
        }

        function lastCard(result, a, b, ){
            var embed = new Discord.RichEmbed()

            if(result.result == "Win"){
                var color = assets.respColor
                var text = `You have won the battle and earned ${result.loot} gold & ${result.xp} xp. \n ${a.name} has slained ${b.name}`
                var img = assets.winRPG
            }else if(result.result == "Lose"){
                var color = assets.red
                var text = `You lost the battle and lose ${result.loot} gold. \n ${b.name} has slained ${a.name}`
                var img = b.image
            }
           
            embed.setColor(color)
            embed.addField(result.result, text)
            embed.setThumbnail(img)
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