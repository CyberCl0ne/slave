const fs = require('fs');
const Discord = require('discord.js');
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const prefix = "?";

const reactions = require('./src/reactions.js');
const msgCount = require('./src/msgcount.js');
const level = require('./src/level.js');
const xp = require('./src/xp.js');
const emotes = require('./src/emotes.js');
const assets = require('./local/assets.js')
const mongoose = require('mongoose');

const uri = process.env.uri 
const addSchema1 = require('./models/addSchema.js');

const colorName = ['hotpink1', 'babyblue1', 'russet1','jade1','bumblebee1','mint1','fossil1','pitchblack1','palewhite1','ferrari1','tiger1','grape1','azure1'];
const resRole = ['Malaysia', 'Singapore'];
const config =  require('./config.json')
const { inspect } = require('util');
const joinChannel = new Map();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const rpgFiles = fs.readdirSync('./commands/rpg').filter(f => f.endsWith('.js'));



const token = process.env.BOT_TOKEN

process.on('unhandledRejection', error => console.error('Uncaught Promise Rejection', error));

mongoose.connect(config.uri, {useNewUrlParser: true});
//connect with mongoDB database

for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    //sets a new item in collection
    //with the key as command name and the value as the exported module
    bot.commands.set(command.name, command);
}

for(const file1 of rpgFiles){
    const command1 = require(`./commands/rpg/${file1}`);
    bot.commands.set(command1.name, command1)
}



bot.on('ready', () =>{

    
    console.log('This bot is alive!');
    bot.user.setActivity('Moonlight by Ali gatie', {type: 'LISTENING'});
    //sets the status of the bot
    
    
})

bot.on('guildMemberAdd', member =>{

    const memberBot = member.guild.members.get('582222069308194818')
    const channel = member.guild.channels.find(channel => channel.name === "📣announcements");
    if(!channel) return;

    member.send(`Hello ${member.user.username}! I am bot to help you in joining [UN]SG-MY server.
     To access all other channel, you need to assign yourself a team. Team represents your country which is Malaysia or Singapore.
     To join a team, all you have to do is go to #choose-side channel and react on the emoji that represents your country`,
     {files: ['https://i.imgur.com/GvxblKK.png','https://i.imgur.com/gICrqs0.png']})
    channel.send(`Let us welcome to our new member, hang tight! ${member.user} is choosing a side right now `)

});

bot.on('guildMemberRemove', member =>{
    const channel =  member.guild.channels.find(channel => channel.name === "📣announcements");
    if(!channel) return;
    channel.send(`Goodbye ${member.user},eventhough it's hard to say`)
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
mongoose.set('useFindAndModify', false);

bot.on('voiceStateUpdate', (oldMember, newMember) => {
    var newUserChannel = newMember.voiceChannel
    var oldUserChannel = oldMember.voiceChannel

    if(oldMember.deaf !== newMember.deaf) return;
    if(newMember.user.bot) return;

    if(oldUserChannel === undefined && newUserChannel !== undefined){
        joinChannel.set(newMember.id, (new Date).getTime());
    }else if(newUserChannel === undefined){
        
        var timeStamp = (new Date).getTime() - joinChannel.get(newMember.id); 
    
        var newValue =  { $set: { vcTime : timeStamp}};

       
        addSchema1.findOneAndUpdate({ userID : newMember.id}, newValue, ["vcTime"],async function(err, res) {
            console.log(err);
            if(!res){
                const upScheme = new addSchema1({
                    _id: mongoose.Types.ObjectId(),
                    username: newMember.user.username,
                    userID: newMember.user.id,
                    birthday: 0,
                    respect: 0,
                    mood: 0,
                    msgSent: 0,
                    vcTime: timeStamp,
                    level: 1,
                    xp: 1,
                    time: new Date()
                })
                upScheme.save()
                .catch(err => console.log(err))
            }
            var vcTime1 = await res.vcTime
           
            var add = vcTime1 + timeStamp;
            res.vcTime =  add
            
            
            res.save()


            .catch(err => console.log(err))
        }).catch(err => console.log(err))

        joinChannel.delete(newMember.id);
    }
})

bot.on('raw', event => {
    
    var eventName = event.t;
    if( eventName == 'MESSAGE_REACTION_ADD') {
        if(event.d.message_id == '594124253465673739'){
            //to filter the event that occur on specific message
            //this is for colour role                   
            var reactionChannel = bot.channels.get(event.d.channel_id);
            if(reactionChannel.messages.has(event.d.message_id)) return; 
             //if it already cached proceed to messageReactionAdd
            else{
                reactionChannel.fetchMessage(event.d.message_id)
                //if not it will cache the message and read the reaction at the specific message          
                .then( msg => {
                    var msgReaction = msg.reactions.get(event.d.emoji.name + ":" + event.d.emoji.id); 
                    //gets the emoji name and id
                    var user = bot.users.get(event.d.user_id);
                    //gets the user ID that interacted with the message
                    bot.emit('messageReactionAdd', msgReaction, user);

                })
                .catch(err => console.log(err));
            }
        }
    }
    
    if( eventName == 'MESSAGE_REACTION_ADD') {
        if(event.d.message_id == '594157320485994496'){
            // for choose-side channel                   
            var reactionChannel = bot.channels.get(event.d.channel_id);
            if(reactionChannel.messages.has(event.d.message_id)) return;
            //if it already cached proceed to messageReactionAdd  
            else{
                reactionChannel.fetchMessage(event.d.message_id)           
                //if not it will cache the message and read the reaction at the specific message
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
    //fetch emoji reaction name
    var role = messageReaction.message.guild.roles.find(role => role.name.toLowerCase() === roleName.toLowerCase());
    //find emoji in guild that matches the name
    var member = messageReaction.message.guild.members.find(member => member.id == user.id);
    //get the id of member that reacted to the message
   
 
    
    async function giveRole(member){
       
        var memberColor =  member.roles.find(r => colorName.includes(r.name));
        //find if the color role is from verified roles, it will remove the current role
        console.log(memberColorID)
        if(memberColor){
            var memberColorID = await member.colorRole.id;
            //get the color role ID from the member
            member.removeRole(memberColorID)
            //removes color role
            .then(console.log('role removed'))
            .catch(err => console.log(err));
        }  
        member.addRole(role.id)
        .then(console.log('Sucesss!'))
        .catch(err => console.log(err));
    };

   if(role){ //filter the reactions that have the same name for the roles
       if(member){
            giveRole(member).catch(err => console.log(err));
            //give roles
        
            
        }
    }
})

bot.on('message', async msg =>{

    let args = await msg.content.substring(prefix.length).split(" ");
    //split the args with whitespace
    if(msg.author.bot) return;
    //if the command from bot return

  
   
   
    const command = bot.commands.get(args[0]) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(args[0]));

    var memberInfo = msg.mentions.members.first();
    //fetch member property
    var avatarInfo = msg.mentions.users.first();
    //fetch user property

   
    

    if(msg.content.startsWith(prefix) && command) {
        try{
            command.execute(msg, args, memberInfo, avatarInfo, bot, assets);
            //executes commands
        }catch(err){
            console.log(err)
            msg.channel.send('There was an error trying to execute the command!');
        }
    }else{
        level(msg);

        xp(msg);

        msgCount(msg);
    
        reactions(msg);

        emotes(msg, args, memberInfo, Discord);
    };
    

})



bot.login(config.token);

