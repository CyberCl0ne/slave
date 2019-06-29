const Discord = require('discord.js');
const bot = new Discord.Client();

const prefix = "?";

const reactions = require('./reactions.js');
const talkedRecently = new Set();
const emotes = require('./emotes.js');
const commands = require('./commands');
const mongoose = require('mongoose');
const uri = process.env.uri 
const addScheme1 = require('./addSchema.js');
const timedPost = require('./timedPost.js');
const colorName = ['hotpink1', 'babyblue1', 'russet1','jade1','bumblebee1','mint1','fossil1','pitchblack1','palewhite1','ferrari1','tiger1','grape1','azure1'];


const token = process.env.BOT_TOKEN
mongoose.connect(uri, {useNewUrlParser: true});





bot.on('ready', () =>{

    
    console.log('This bot is alive!');
    bot.user.setActivity('Habbo | use ?help');
    
    
    
})

bot.on('guildMemberAdd', member =>{

    const channel = member.guild.channels.find(channel => channel.name === "📣announcements");
    if(!channel) return;

    channel.send(`Let us welcome to our new member, hang tight! ${member.user} is choosing a side right now `)

});

bot.on('guildMemberRemove', member =>{
    const channel =  member.guild.channels.find(channel => channel.name === "📣announcements");
    if(!channel) return;
     channel.send(`Goodbye ${member.user}, it's hard to say goodbye `)
})

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

bot.on('raw', event => {
    
    var eventName = event.t;
    if( eventName == 'MESSAGE_REACTION_ADD') {
        if(event.d.message_id == '594124253465673739'){                   //for colour role
            var reactionChannel = bot.channels.get(event.d.channel_id);
            if(reactionChannel.messages.has(event.d.message_id)) return;  //if it already cached proceed to messageReactionAdd
            else{
                reactionChannel.fetchMessage(event.d.message_id)            //if not it will cache the message and read the reaction at the specific message
                .then( msg => {
                    var msgReaction = msg.reactions.get(event.d.emoji.name + ":" + event.d.emoji.id);
                    var user = bot.users.get(event.d.user_id);
                    bot.emit('messageReactionAdd', msgReaction, user);

                })
                .catch(err => console.log(err));
            }
        }
    }

    if( eventName == 'MESSAGE_REACTION_ADD') {
        if(event.d.message_id == '594157320485994496'){                   // for choose-side channel
            var reactionChannel = bot.channels.get(event.d.channel_id);
            if(reactionChannel.messages.has(event.d.message_id)) return;  //if it already cached proceed to messageReactionAdd
            else{
                reactionChannel.fetchMessage(event.d.message_id)            //if not it will cache the message and read the reaction at the specific message
                .then( msg => {
                    var msgReaction = msg.reactions.get(event.d.emoji.name + ":" + event.d.emoji.id);
                    var user = bot.users.get(event.d.user_id);
                    
                    bot.emit('messageReactionAdd', msgReaction, user);

                })
                .catch(err => console.log(err));
            }
        }
    }
})



bot.on('messageReactionAdd', (messageReaction, user) => {
    var roleName = messageReaction.emoji.name;
    var role = messageReaction.message.guild.roles.find(role => role.name.toLowerCase() === roleName.toLowerCase());
    var member = messageReaction.message.guild.members.find(member => member.id == user.id);
   
   
    
    
    async function giveRole(member){
        var memberColorID = await member.colorRole.id;
        var memberColor = await member.roles.find(r => colorName.includes(r.name));
        console.log(memberColorID)
        if(memberColor){
           
            member.removeRole(memberColorID)
            .then(console.log('role removed'))
            .catch(err => console.log(err));
        }  
        member.addRole(role.id)
        .then(console.log('Sucesss!'))
        .catch(err => console.log(err));
    };

   if(role){
       if(member){
            giveRole(member);
        }
    }
})

bot.on('message', msg =>{

    var memberInfo = msg.mentions.members.first();
    var avatarInfo = msg.mentions.users.first();

    const thisChannel = msg.guild.channels.find(channel => channel.name === "🤖bot-commands");
    let args = msg.content.substring(prefix.length).split(" ");
    if(msg.author.bot) return;

   
   

   addScheme1.findOne({ userID: msg.author.id },['username','msgSent','birthday','respect','mood','msgSent'], async function(err, myUser){
       if(err) return console.log(err)
       if(!myUser){
           const upScheme = new addScheme1({
               _id: mongoose.Types.ObjectId(),
                username: msg.author.username,
                userID: msg.author.id,
                birthday: 0,
                respect: 0,
                mood: 0,
                msgSent: 0,
                time: msg.createdAt
            })
            await upScheme.save()
            .catch(err => console.log(err))
        }
        
        myUser.msgSent = myUser.msgSent + 1
        myUser.username = msg.author.username
        await myUser.save()
        .catch(err => console.log(err))
    }).catch(err => console.log(err))
    
    timedPost(msg);

   
    reactions(msg);

    if (!msg.content.startsWith(prefix)) return;

  
    if(!args[0]) return;

   
    emotes(msg, args, memberInfo, Discord);
  
    
    if(msg.mentions.everyone){
        msg.reply("OWowowow slow down mate. That's illegal");
    }

        
  

   
    if(args[0] == 'respect'){
        let memberInfo1 = msg.mentions.members.first();
                
        let author = msg.guild.members.get(msg.author.id).displayName;
        const respBoard = msg.guild.channels.find( channel => channel.name == '🏅respect-board');
    
        if(!memberInfo1) return msg.reply('You need to tell me which user you want to respect')
        if(msg.author.id === memberInfo1.id){
            return msg.reply("You can't give respect to yourself 😜");                                                                        //prevent users from giving respect to themselves
        };
        
       
        let compliments = ["You've proved your worthiness","A knight with shining armour","What an honor!","King Arthur himself bows down to you","May your day blessed",
            "With the highest regard","It ain't much but it honest work","You should be proud of yourself","You have impeccable manners",
            "You're more helpful than you realize","Your kindness is a balm to all who encounter it",
            "You're even more beautiful in the inside than you're on the outside","You're a candle in the darkness",
            "You're a gift to those who are around you","You're breathtaking"]
        var randomCompliments = compliments[Math.floor(Math.random() * compliments.length)];                                            //randomize compliments

       
        if(talkedRecently.has(msg.author.id)){
            msg.reply('You have used up your respect for today')                                                                        
        } else {
                addScheme1.findOne({ userID : memberInfo1.id }, 'respect', async function(err, myUser){
                if(err) return console.log(err)
                if(!myUser){
                    const upScheme = new addScheme1({
                        _id: mongoose.Types.ObjectId(),
                        username: memberInfo1.displayName,
                        userID: memberInfo1.id,
                        birthday: 0,
                        respect: 0,
                        mood: 'none',
                        msgSent: 0,
                        time: msg.createdAt
                    })
                    await upScheme.save()
                    .then(result => console.log(result))
                    .catch(err => console.log(err))
                    
                }else{
                    myUser.respect = myUser.respect + 1;
                    myUser.save()
                    .catch(err => console.log(err))
                
                    const embed = new Discord.RichEmbed()
                    .setTitle('Respect Award')
                    .addField(`**${memberInfo1.displayName}** has been respected!🔱`, `${randomCompliments}`)
                    .setColor('FFD700')
                    .setThumbnail('https://i.redd.it/06hdr24vpiuy.png')
                    .setTimestamp()
                    .setFooter(`Respected by ${author}`, `${msg.author.avatarURL}`)
                    msg.channel.send(embed);
                    respBoard.send(embed);
                }
            })
            

            talkedRecently.add(msg.author.id);
            setTimeout(() => {                                          //creates a cooldown for this command
                talkedRecently.delete(msg.author.id);
            }, 86400000);                                               //24hrs
        }
        return
    }



    if(args[0] == prefix) return;


    commands(msg, Discord, args, memberInfo, avatarInfo, thisChannel, bot);
       
    mongoose.set('debug', true);
})



bot.login(token);

