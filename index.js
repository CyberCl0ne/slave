const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('./config.json');
const prefix = "+";
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

    

    if(newMember.roles.has(myRole.id)){
        channel.send(`${newMember.user.username} has joined ${myRole.name} squad!`)
    };
        
    

    if(newMember.roles.has(sgRole.id)){
        channel.send(`${newMember.user.username} has joined ${sgRole.name} squad!`)
    };
        
    

});


bot.on('message', msg=>{



    let args = msg.content.substring(prefix.length).split(" ");

    if (!msg.content.startsWith(prefix) || msg.author.bot) return;

    switch(args[0]){
        case 'ping':

            msg.channel.sendMessage('pong!')
        break;
        case 'website':
            msg.channel.sendMessage('youtube.com')
        break;
        case 'info':
            const embed = new Discord.RichEmbed()
            .setTitle('User Information')
            .addField('Player Name', msg.author.username)
            .setColor('2d6fd8')
            .setThumbnail(msg.author.avatarURL)

            msg.channel.sendEmbed(embed);
        break;
        case 'clear':
            if(!args[1]) return msg.reply('Error please define second arg')
            msg.channel.bulkDelete(args[1]);
        break;

    }   
    
})

bot.login(config.token);

