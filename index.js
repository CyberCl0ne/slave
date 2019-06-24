const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('./config.json');
const prefix = "?";
let xp = require('./xp.json');
var data = require('./data.json');
const fs = require('fs');
const reactions = require('./reactions.js');
const talkedRecently = new Set();
const emotes = require('./emotes.js');
const commands = require('./commands');
           




let respects = JSON.parse(fs.readFileSync('./reputation.json', 'utf8'));



bot.on('ready', () =>{

    
    console.log('This bot is alive!');
    bot.user.setActivity('Habbo | use ?help');
    

    
})

bot.on('guildMemberAdd', member =>{

    const channel = member.guild.channels.find(channel => channel.name === "announcements");
    if(!channel) return;

    channel.send(`Welcome to our server, ${member.user} , have a casual chat with people here! `)

});

bot.on('guildMemberUpdate',(oldMember, newMember) =>{
    const channel = newMember.guild.channels.find(channel => channel.name === "📣announcements");
    if(!channel) return;


    let myRole = newMember.guild.roles.find(role => role.name === "Malaysia");
    let sgRole = newMember.guild.roles.find(role => role.name === "Singapore");
    let myEmoji = bot.emojis.find(emoji => emoji.name === "malaysia");
    let sgEmoji = bot.emojis.find(emoji => emoji.name === "singapore");

    if(oldMember.nickname !== newMember.nickname) return;
 
    if(oldMember.colorRole == null){
        if(newMember.roles.has(myRole.id) ){
            channel.send(`${newMember.user} has joined ${myRole.name} squad! ${myEmoji}`)
        };
        
    
        if(newMember.roles.has(sgRole.id) ){
            channel.send(`${newMember.user} has joined ${sgRole.name} squad! ${sgEmoji}`)
        };
    }
        
   
    

});


bot.on('message', msg =>{

    var memberInfo = msg.mentions.members.first();
    var avatarInfo = msg.mentions.users.first();

    const thisChannel = msg.guild.channels.find(channel => channel.name === "🤖bot-commands");
    let args = msg.content.substring(prefix.length).split(" ");
    
   
  
    reactions(msg);

    if (!msg.content.startsWith(prefix) || msg.author.bot ) return;

  
    if(!args[0]) return;

   
    emotes(msg, args, memberInfo, Discord);
  
    



  

    if(args[0] == 'help'){
        let myEmoji = bot.emojis.find(emoji => emoji.name === "malaysia");
        let sgEmoji = bot.emojis.find(emoji => emoji.name === "singapore");
    
    
        const embed = new Discord.RichEmbed()
        .setTitle('Bot Commands')
        .addField('?info Malaysia', `Displays info about Malaysia team ${myEmoji}`, true )
        .addField('?info Singapore', `Displays info about Singapore team ${sgEmoji}`)
        .addField('?birthday', 'Sets your birthday', true)
        .addField('?info @user', 'Displays info about mentioned user', true)      
        .addField('?mood', 'Sets your current mood', true)
        .addField('?ping', 'Gives you ping result for the bot', true)
        .addField('?respect @user ✔', 'Show your gratitude by giving them respect')
        .addField('?shoot @user ✔', 'If you can only kill them irl', true)
        .addField('?hug @user ✔', 'Hug a person', true)
        .addField('?kick @user ✔', 'Kick those butts', true)
        .addField('?slap @user ✔', 'It feels good tho', true)
        .addField('?fart @user ✔', 'Let them smell', true)
        .addField('Addition', '"✔" shows the commands that can be used in any channel')
        .setThumbnail('https://i.imgur.com/iwewYsx.png')
        .setTimestamp()
        .setColor('24E2E7')
        .setFooter('UN[SG-MY]©', 'https://i.imgur.com/TnNIYK6.png')
        return msg.channel.send(embed);

    }
    if(args[0] == 'respect'){
        let memberInfo1 = msg.mentions.members.first();
                
        let author = msg.guild.members.get(msg.author.id).displayName;
        const respBoard = msg.guild.channels.find( channel => channel.name == '🏅respect-board');
    
        if(!memberInfo1) return msg.reply('You need to tell me which user you want to respect')
        if(msg.author.id === memberInfo1.id){
            return msg.reply("You can't give respect to yourself 😜");                                                                        //prevent users from giving respect to themselves
        };
        if(!respects[memberInfo1.id]) respects[memberInfo1.id] = {
            respects : 0
        };
        let userData3 = respects[memberInfo1.id];
        let compliments = ["You've proved your worthiness","A knight with shining armour","What an honor!","King Arthur himself bows down to you","May your day blessed",
            "With the highest regard","It ain't much but it honest work","You should be proud of yourself","You have impeccable manners",
            "You're more helpful than you realize","Your kindness is a balm to all who encounter it",
            "You're even more beautiful in the inside than you're on the outside","You're a candle in the darkness",
            "You're a gift to those who are around you","You're breathtaking"]
        var randomCompliments = compliments[Math.floor(Math.random() * compliments.length)];                                            //randomize compliments

        fs.writeFile('./reputation.json', JSON.stringify(respects), (err) =>{
            if(err) console.log(err)
        });
        if(talkedRecently.has(msg.author.id)){
            msg.reply('You can only give one respect per day')                                                                        
        } else {
            let a = userData3.respects;
            userData3.respects = (++a);
            fs.writeFile('./reputation.json', JSON.stringify(respects), (err) =>{
                if(err) console.log(err)
            });
            const embed = new Discord.RichEmbed()
            .setTitle('Respect Award')
            .addField(`**${memberInfo1.displayName}** has been respected!🔱`, `${randomCompliments}`)
            .setColor('FFD700')
            .setThumbnail('https://i.redd.it/06hdr24vpiuy.png')
            .setTimestamp()
            .setFooter(`Respected by ${author}`, `${msg.author.avatarURL}`)
            msg.channel.send(embed);
            respBoard.send(embed);

            talkedRecently.add(msg.author.id);
            setTimeout(() => {                                          //creates a cooldown for this command
                talkedRecently.delete(msg.author.id);
            }, 86400000);                                               //24hrs
        }
        return
    }



    if(args[0] == prefix) return;


    commands(msg, Discord, args, memberInfo, avatarInfo, thisChannel);
       
    
})

bot.login(process.env.BOT_TOKEN);

