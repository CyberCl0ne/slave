const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('./config.json');
const prefix = "?";
let xp = require('./xp.json');
var data = require('./data.json');
const fs = require('fs');
const reactions = require('./reactions.js');
const talkedRecently = new Set();


               



let birthday = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
let mood = JSON.parse(fs.readFileSync('./mood.json', 'utf8'));
let respects = JSON.parse(fs.readFileSync('./reputation.json', 'utf8'));



bot.on('ready', () =>{

    
    console.log('This bot is alive!');
    bot.user.setActivity('Habbo');
    

    
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

    if (!msg.content.startsWith(prefix) || msg.author.bot) return;

  
    if(!args[0]) return;

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
        .addField('?respect @user ✔️', 'Show your gratitude by giving them respect')
        .addField('?shoot @user ✔️', 'If you can only kill them irl', true)
        .addField('?hug @user ✔️', 'Hug a person', true)
        .addField('?kick @user ✔️', 'Kick those butts', true)
        .addField('?slap @user ✔️', 'It feels good tho', true)
        .addField('?fart @user ✔️', 'Let them smell', true)
        .addField('Addition', '"✔️" shows the commands that can be used in any channel')
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
    
        
        if(msg.author.id === memberInfo1.id){
            return msg.reply("You can't give respect to yourself 😜");
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
        var randomCompliments = compliments[Math.floor(Math.random() * compliments.length)];

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
            setTimeout(() => {
                talkedRecently.delete(msg.author.id);
            }, 86400000);
        }
        return
    }

    function emotes(title, field, detail, color, thumbnail, footer){
        const embed = new Discord.RichEmbed()
        .setTitle(title)
        .addField(field, detail)
        .setColor(color)
        .setThumbnail(thumbnail)
        .setTimestamp()
        .setFooter(footer)
        return msg.channel.send(embed);
    }
    
    if(args[0] == 'shoot'){
        let author = msg.guild.members.get(msg.author.id).displayName;
        if(!memberInfo){
            return msg.channel.send('You need to mention which user you want to kill 😈');
        }
        
        let title = 'Shots fired!'
        let field = ` ${memberInfo.displayName}, you were just shot by ${author} 🔫`
        let detail = 'Blood, blood everywhere'
        let color = 'bb0a1e'
        let thumbnail = 'https://i.pinimg.com/originals/5e/59/f6/5e59f6475951584c42ff751e8d748f66.gif'
        let footer = `Shot by ${author}`
        return emotes(title, field, detail, color, thumbnail, footer);
    }
       
    if(args[0] == 'hug'){
        let author = msg.guild.members.get(msg.author.id).displayName;
        if(!memberInfo){
            return msg.channel.send('You need to mention which user you want to hug️ ❤️');
        }
        
        let title = 'Giving you a big hug!'
        let field = ` ${memberInfo.displayName}, you were just hugged by ${author} ❤️`
        let detail = '😍'
        let color = 'ff69b4'
        let thumbnail = 'https://i.pinimg.com/originals/42/94/de/4294deb5ec97086243174b085d609695.gif'
        let footer = `Hugged by ${author}`
        return emotes(title, field, detail, color, thumbnail, footer);
    }

    if(args[0] == 'slap'){
        let author = msg.guild.members.get(msg.author.id).displayName;
        if(!memberInfo){
            return msg.channel.send('You need to mention which user you want to **slap**!');
        }
        
        let title = 'My hand is coming!'
        let field = ` ${memberInfo.displayName}, you were just slapped by ${author} `
        let detail = 'auchh'
        let color = 'f4be41'
        let thumbnail = 'https://media3.giphy.com/media/xT9IgzTnZHL9zp6IPS/source.gif'
        let footer = `Slapped by ${author}`
        return emotes(title, field, detail, color, thumbnail, footer);
    }

    if(args[0] == 'fart'){
        let author = msg.guild.members.get(msg.author.id).displayName;
        if(!memberInfo){
            return msg.channel.send('You need to mention which user you want to fart 💨');
        }
        
        let title = 'Smell this!'
        let field = ` ${memberInfo.displayName}, you smelled ${author}'s fart `
        let detail = 'Serves you well 💨'
        let color = '26ba21'
        let thumbnail = 'https://media.tenor.com/images/074a0cd24138a6260391f90efabdab5c/tenor.gif'
        let footer = `Farted by ${author}`
        return emotes(title, field, detail, color, thumbnail, footer);
    }

    if(args[0] == 'kick'){
        let author = msg.guild.members.get(msg.author.id).displayName;
        if(!memberInfo){
            return msg.channel.send('You need to mention which user you want to **kick**!');
        }
        
        let title = 'Parry this!'
        let field = ` ${memberInfo.displayName}, you were kicked at the butt by ${author}`
        let detail = 'Right to the butt'
        let color = 'f47a42'
        let thumbnail = 'https://media.tenor.com/images/27f16871c55a3376fa4bfdd76ac2ab5c/tenor.gif'
        let footer = `Kicked by ${author}`
        return emotes(title, field, detail, color, thumbnail, footer);
    }
    



    if(args[0] == "clear"){
        if(!args[1]) return msg.reply('Error please define second arg')
        return msg.channel.bulkDelete(args[1]);
    }

    if(args[0] == prefix) return;

    if(msg.channel.name !== thisChannel.name){
    return msg.reply(`Please use #bot-commands channel :poop:`);
    }

   

    if(msg.channel.name == thisChannel.name){
        switch(args[0]){
            case 'ping':
                msg.channel.send("Pinging ...") // Placeholder for pinging ... 
			    .then((msg) => { // Resolve promise
				msg.edit("Ping: " + (Date.now() - msg.createdTimestamp) + "ms") // Edits message with current timestamp minus timestamp of message
			});
                
            break;
            case 'website':
                msg.channel.send('youtube.com')
            break;
            case 'info':
                let myRole = msg.guild.roles.find(role => role.name === "Malaysia");
                let sgRole = msg.guild.roles.find(role => role.name === "Singapore");

                
                
                
         
            
                if (!args[1]){
                    return msg.reply('You need to specify which team or user')
                }

                if(!memberInfo){

                    if (args[1] == myRole.name){
                        const embed = new Discord.RichEmbed()
                        .setTitle('Team Information')
                        .addField('Region', 'Malaysia')
                        .setTimestamp()
                        .setThumbnail('https://i.imgur.com/0ZK52WE.png')
                        .setColor('4286f4')
                        .addField('Member', myRole.members.size)
                        .setFooter('UN[SG-MY]©', 'https://i.imgur.com/TnNIYK6.png')
                        .setTimestamp()
                        return msg.channel.send(embed);
                    };
    
                    if (args[1] == sgRole.name){
                        const embed = new Discord.RichEmbed()
                        .setTitle('Team Information')
                        .addField('Region', 'Singapore')
                        .setTimestamp()
                        .setThumbnail('https://i.imgur.com/x3KTH7M.png')
                        .setColor('ff2121')
                        .addField('Member', sgRole.members.size)
                        .setFooter('UN[SG-MY]©', 'https://i.imgur.com/TnNIYK6.png')
                        .setTimestamp()
                        return msg.channel.send(embed);
                    };

                }

                if(memberInfo.joinedAt == undefined) return;

                var pfp = avatarInfo.avatarURL
                var d = new Date(memberInfo.joinedAt),
                dformat = [d.getDate(),d.getMonth()+1,d.getFullYear()].join('/');

                var periods = {
                    month: 30 * 24 * 60 * 60 * 1000,
                    week: 7 * 24 * 60 * 60 * 1000,
                    day: 24 * 60 * 60 * 1000,
                    hour: 60 * 60 * 1000,
                    minute: 60 * 1000
                };

                var msgCreated = Date.now(msg.channel.createdAt)
                

                function formatTime(msgCreated, d) {
                    var diff = msgCreated - d;
                  
                    if (diff > periods.month) {
                      // it was at least a month ago
                      return Math.floor(diff / periods.month) + " months";
                    } else if (diff > periods.week) {
                      return Math.floor(diff / periods.week) + " weeks";
                    } else if (diff > periods.day) {
                      return Math.floor(diff / periods.day) + " days";
                    } else if (diff > periods.hour) {
                      return Math.floor(diff / periods.hour) + " hours";
                    } else if (diff > periods.minute) {
                      return Math.floor(diff / periods.minute) + " minutes";
                    }
                    return;
                }
               
                
                if(pfp == undefined){
                    var pfp = avatarInfo.defaultAvatarURL
                }
              

                if (memberInfo.roles.has(myRole.id)){                 //initiates member info
                    
                    if(!birthday[memberInfo.id]) birthday[memberInfo.id] = {
                        birthday : 0
                    };
                    if(!mood[memberInfo.id]) mood[memberInfo.id] = {
                        mood : 0
                    };
                    if(!respects[memberInfo.id]) respects[memberInfo.id] = {
                        respects : 0
                    };
                    let userData = birthday[memberInfo.id];
                    let userData2 = mood[memberInfo.id];
                    let userData3 = respects[memberInfo.id];
                    fs.writeFile('./data.json', JSON.stringify(birthday), (err) =>{
                        if(err) console.log(err)
                    });
                    fs.writeFile('./mood.json', JSON.stringify(mood), (err) =>{
                        if(err) console.log(err)
                    });
                    fs.writeFile('./reputation.json', JSON.stringify(respects), (err) =>{
                        if(err) console.log(err)
                    });
                    var memberPeriod = formatTime(msgCreated, d)

                    const embed = new Discord.RichEmbed()
                    .setTitle('Member Information')
                    .setColor(`${memberInfo.displayHexColor}`)
                    .addField('Name', `${memberInfo.displayName}`, true)
                    .addField('Team', `${myRole}`, true)
                    .addField('Birthday', `${userData.birthday}`, true)
                    .addField('Mood', `${userData2.mood}`, true)
                    .addField('Respects', `${userData3.respects} 🥇`)
                    .addField('Roles', memberInfo.roles.map(r => `${r}`).join('|'))
                    .addField('Joined since', `${dformat} (${memberPeriod})`)
                    .setThumbnail(`${pfp}`)
                    .setFooter('UN[SG-MY]©', 'https://i.imgur.com/TnNIYK6.png')
                    .setTimestamp()
                    return msg.channel.send(embed);
                }

                if (memberInfo.roles.has(sgRole.id)){        //initiates member info
                   
                    if(!birthday[memberInfo.id]) birthday[memberInfo.id] = {
                        birthday : 0
                    };
                    if(!mood[memberInfo.id]) mood[memberInfo.id] = {
                        mood : 0
                    };
                    if(!respects[memberInfo.id]) respects[memberInfo.id] = {
                        respects : 0
                    };
                    let userData = birthday[memberInfo.id];
                    let userData2 = mood[memberInfo.id];
                    let userData3 = respects[memberInfo.id];
                    fs.writeFile('./data.json', JSON.stringify(birthday), (err) =>{
                        if(err) console.log(err)
                    });
                    fs.writeFile('./mood.json', JSON.stringify(mood), (err) =>{
                        if(err) console.log(err)
                    });
                    fs.writeFile('./reputation.json', JSON.stringify(respects), (err) =>{
                        if(err) console.log(err)
                    });

                    var memberPeriod = formatTime(msgCreated, d)

                    const embed = new Discord.RichEmbed()                   
                    .setTitle('Member Information')
                    .setColor(`${memberInfo.displayHexColor}`)
                    .addField('Name', `${memberInfo.displayName}`, true)
                    .addField('Team', `${sgRole}`, true)
                    .addField('Birthday', `${userData.birthday}`, true)
                    .addField('Mood', `${userData2.mood}`, true)
                    .addField('Respects', `${userData3.respects} 🥇`)
                    .addField('Roles', memberInfo.roles.map(r => `${r}`).join('|'))
                    .addField('Joined since', `${dformat} (${memberPeriod})`)
                    .setThumbnail(`${pfp}`)
                    .setFooter('UN[SG-MY]©', 'https://i.imgur.com/TnNIYK6.png')
                    .setTimestamp()
                    return msg.channel.send(embed);      
                }  
               
            
            break;
           
            case 'birthday':
                
                if(!birthday[msg.author.id]) birthday[msg.author.id] = {
                    birthday : 0
                };
                if(!args[1] || !args[2] || !args[3]) return msg.reply("Invalid input! Please use dd mm yyyy format ")
                    
                
               
                let userData = birthday[msg.author.id];
    
                bDay = args[1] + "/" + args[2] + "/" + args[3];                
                userData.birthday = (bDay);
                fs.writeFile('./data.json', JSON.stringify(birthday), (err) =>{
                    if(err) console.log(err)
                });
                msg.reply(`Your birthday has been updated to "${bDay}"`)
                
            break;
            case 'mood':
                if(!mood[msg.author.id]) mood[msg.author.id] = {
                    mood : 0
                };
                if(!args[1]) return  msg.reply(`What? You're telling me you don't have any mood right now? :eyes: `);
                let userData1 = mood[msg.author.id];
                newMood = args[1];
                userData1.mood = (newMood);
                fs.writeFile('./mood.json', JSON.stringify(mood), (err) =>{
                    if(err) console.log(err)
                });
                msg.reply(`Your mood has been updated to "${newMood}"`)

            break;
          
           
           
           
        }
    }
       
    
})

bot.login(config.token);

