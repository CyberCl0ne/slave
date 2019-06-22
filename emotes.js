module.exports = (msg, args, memberInfo, Discord) => {

   

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
    return;

};