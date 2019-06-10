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


bot.on('message', msg, member=>{

    let myRole = member.guild.roles.find(role => role.name === "Malaysia");
    let sgRole = member.guild.roles.find(role => role.name === "Singapore");

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
            
            args[1] = msg.content.role
            if (args[1] == 0){
                return msg.reply('You need to specify which team')
            }

            else if (args[1] !== myRole || sgRole){
                return msg.reply("That's an invalid role")
            }

            else if (args[1] === myRole || sgRole){
            
            const embed = new Discord.RichEmbed()
            .setTitle('Team Information')
            .addField('Team', msg.guild.role.name)
            .setTimestamp()
            
            if(args[1] === myRole){
                const embed = new Discord.RichEmbed()
                .setThumbnail({files: ["https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.affsuzukicup.com%2F2018%2Fimages%2Fflags%2Fmalaysia.png&imgrefurl=https%3A%2F%2Fwww.affsuzukicup.com%2F&docid=6IeO630wmweBWM&tbnid=uJB99oPzMZ12CM%3A&vet=10ahUKEwjbsv_OxN7iAhXMfSsKHadbDs8QMwhHKAAwAA..i&w=239&h=319&bih=959&biw=851&q=malaysia%20aff%20logo&ved=0ahUKEwjbsv_OxN7iAhXMfSsKHadbDs8QMwhHKAAwAA&iact=mrc&uact=8"]})
                .setColor('4286f4')
                .addField('Team member', myRole.members.size)
            }
            else if(args[1] === sgRole){
                const embed = new Discord.RichEmbed()
                .setThumbnail({files: ["https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.affsuzukicup.com%2F2018%2Fimages%2Fflags%2Fsingapore.png&imgrefurl=https%3A%2F%2Fwww.affsuzukicup.com%2F2018%2Fteams%2Fsingapore&docid=siyTMers73MlgM&tbnid=G14U1ObFqNFAnM%3A&vet=10ahUKEwiCs-XBxt7iAhVFP48KHfRyCDQQMwhYKBEwEQ..i&w=239&h=319&bih=959&biw=851&q=singapore%20aff%20logo&ved=0ahUKEwiCs-XBxt7iAhVFP48KHfRyCDQQMwhYKBEwEQ&iact=mrc&uact=8"]})
                .setColor('ff2121')
                .addField('Team member', sgRole.members.size)
            };
            
            

            msg.channel.sendEmbed(embed);
            };
            
        break;
        case 'clear':
            if(!args[1]) return msg.reply('Error please define second arg')
            msg.channel.bulkDelete(args[1]);
        break;
    

    }   
    
})

bot.login(config.token);

