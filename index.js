const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('./config.json');
const prefix = "?";
let xp = require('./xp.json');
var data = require('./data.json');
const fs = require('fs');





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
    
    
   

    if(oldMember.roles.has(0)) return;

    

    

    if(newMember.roles.has(myRole.id) && oldMember.nickname == newMember.nickname && oldMember.colorRole == newMember.colorRole ){
        channel.send(`${newMember.user} has joined ${myRole.name} squad!`)
    };
        
    

    if(newMember.roles.has(sgRole.id) && oldMember.nickname  == newMember.nickname && oldMember.colorRole == newMember.colorRole ){
        channel.send(`${newMember.user} has joined ${sgRole.name} squad!`)
    };
        
    

});


bot.on('message', msg =>{



    const thisChannel = msg.guild.channels.find(channel => channel.name === "🤖bot-commands");
    let args = msg.content.substring(prefix.length).split(" ");
    

   
    try {
        if(msg.content.includes('wow')){
            msg.react('585848100933992448')
        }; 
        if(msg.content.includes('oof')){
            msg.react('585420623161982987')
        };
        if(msg.content.includes('lmao')){
            msg.react('585422744347475968')
        };
        if(msg.content.includes('lol')){
            msg.react('😂')
        };
        if(msg.content.includes('wtf')){
            msg.react('585422238702895104')
        };
        if(msg.content.includes('haha')){
            msg.react('585422744347475968')
            msg.react('😂')
        };
    }
    catch(err){
        console.log(err)
    }

    

    if (!msg.content.startsWith(prefix) || msg.author.bot) return;

    

    if(msg.channel.name !== thisChannel.name){
    return msg.reply(`Please use #bot-commands channel :poop:`);
    }

   

    if(msg.channel.name == thisChannel.name){
        switch(args[0]){
            case 'ping':
                msg.channel.send("Pinging ...") // Placeholder for pinging ... 
			    .then((msg) => { // Resolve promise
				msg.edit("Ping: " + (Date.now() - msg.createdTimestamp)) // Edits message with current timestamp minus timestamp of message
			});
                
            break;
            case 'website':
                msg.channel.send('youtube.com')
            break;
            case 'info':
                let myRole = msg.guild.roles.find(role => role.name === "Malaysia");
                let sgRole = msg.guild.roles.find(role => role.name === "Singapore");

                let memberInfo = msg.mentions.members.first();
                let avatarInfo = msg.mentions.users.first();
               
                
                
         
            
                if (!args[1]){
                    return msg.reply('You need to specify which team')
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
                        return msg.channel.send(embed);
                    };

                }

                var d = new Date(memberInfo.joinedAt),
                dformat = [d.getDate(),d.getMonth()+1,d.getFullYear()].join('/');

               

                if (memberInfo.roles.has(myRole.id)){
                    const embed = new Discord.RichEmbed()
                    

                    .setTitle('Member Information')
                    .setColor(`${memberInfo.displayHexColor}`)
                    .addField('Name', `${memberInfo.displayName}`, true)
                    .addField('Team', `${myRole}`, true)
                    .addField('Roles', `${memberInfo.roles.map(r => r.name)}`)
                    .addField('Joined since', `${dformat}`)
                    .setThumbnail(`${avatarInfo.avatarURL}`)
                    return msg.channel.send(embed);
                }

                if (memberInfo.roles.has(sgRole.id)){
                    const embed = new Discord.RichEmbed()
                    
                    
                    .setTitle('Member Information')
                    .setColor(`${memberInfo.displayHexColor}`)
                    .addField('Name', `${memberInfo.displayName}`, true)
                    .addField('Team', `${sgRole}`, true)
                    .addField('Roles', `${memberInfo.roles.map(r => r.name)}`)
                    .addField('Joined since', `${dformat}`)
                    .setThumbnail(`${avatarInfo.avatarURL}`)
                    return msg.channel.send(embed);
                }
        
               
            
            break;
            case 'clear':
                if(!args[1]) return msg.reply('Error please define second arg')
                msg.channel.bulkDelete(args[1]);
            break;
            case 'wow':
                msg.react('585848100933992448');
            break;
           
           
        }
    }
       
    
})

bot.login(config.token);

