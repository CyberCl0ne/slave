const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('./config.json');
const prefix = "?";
let xp = require('./xp.json');



bot.on('ready', () =>{
    console.log('This bot is online!');
    bot.user.setActivity('Habbo');
    
})

bot.on('guildMemberAdd', member =>{

    const channel = member.guild.channels.find(channel => channel.name === "announcements");
    if(!channel) return;

    channel.send(`Welcome to our server, ${member.user} , have a casual chat with people here! `)

});

bot.on('guildMemberUpdate',(oldMember, newMember) =>{
    const channel = newMember.guild.channels.find(channel => channel.name === "announcements");
    if(!channel) return;


    let myRole = newMember.guild.roles.find(role => role.name === "Malaysia");
    let sgRole = newMember.guild.roles.find(role => role.name === "Singapore");
    
    
   

    if(oldMember.roles.has(0)) return;

    

    if(newMember.roles.has(myRole.id) && oldMember.nickname == newMember.nickname){
        channel.send(`${newMember.user.username} has joined ${myRole.name} squad!`)
    };
        
    

    if(newMember.roles.has(sgRole.id) && oldMember.nickname == newMember.nickname){
        channel.send(`${newMember.user.username} has joined ${sgRole.name} squad!`)
    };
        
    

});


bot.on('message', msg =>{

    

    let args = msg.content.substring(prefix.length).split(" ");
    

    if (!msg.content.startsWith(prefix) || msg.author.bot) return;

    switch(args[0]){
        case 'ping':

            msg.channel.send('pong!')
        break;
        case 'website':
            msg.channel.send('youtube.com')
        break;
        case 'info':
            let myRole = msg.guild.roles.find(role => role.name === "Malaysia");
            let sgRole = msg.guild.roles.find(role => role.name === "Singapore");

            let roleInfo = msg.mentions.roles.first();
            
            if (!args[1]){
                return msg.reply('You need to specify which team')
            }

        

            
            if (roleInfo.id == myRole.id){
            const embed = new Discord.RichEmbed()
            .setTitle('Team Information')
            .addField('Region', roleInfo)
            .setTimestamp()
            .setThumbnail('https://i.imgur.com/0ZK52WE.png')
            .setColor('4286f4')
            .addField('Member', myRole.members.size)
            msg.channel.send(embed);
             }

            if (roleInfo.id == sgRole.id){
            const embed = new Discord.RichEmbed()
            .setTitle('Team Information')
            .addField('Region', roleInfo)
            .setTimestamp()
            .setThumbnail('https://i.imgur.com/x3KTH7M.png')
            .setColor('ff2121')
            .addField('Member', sgRole.members.size)
            msg.channel.send(embed);
            };
        
            
            
            
        break;
        case 'clear':
            if(!args[1]) return msg.reply('Error please define second arg')
            msg.channel.bulkDelete(args[1]);
        break;
    

    }   
    
})

bot.login(config.token);

