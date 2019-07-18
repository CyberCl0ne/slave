const assets = require('../local/assets.js');
const storage = require('../local/storage.js');
const mongoose = require('mongoose');
const Discord = require('discord.js');
const addSchema1 = require('../models/addSchema.js');

module.exports = {
    name: 'respect',
    description: 'Give respect to other user. Limit 3x respect per day. Use \` ?respect @user \` to respect a user.',
    aliases: ['r', 'resp'],
    execute(msg){
        //A feature to give respect to other members
    
        let memberInfo1 = msg.mentions.members.first();
       
        let author = msg.guild.members.get(msg.author.id).displayName;
        const respBoard = msg.guild.channels.find( channel => channel.name == '🏅respect-board');
     
        if(!memberInfo1) return msg.reply('You need to tell me which user you want to respect')
         
        if(msg.author.id === memberInfo1.id){
            return msg.reply("You can't give respect to yourself 😜");                                                                       
        }; //prevent users from giving respect to themselves

        if(memberInfo1.user.bot){
            return msg.reply("You can't do that!")
        };
         
   
        let compliments = assets.randomCompliment;
        var randomCompliments = compliments[Math.floor(Math.random() * compliments.length)];                                           
        //randomize compliments
 
        if(!storage.respLimit.has(msg.author.id)){
          storage.respLimit.set(msg.author.id, 0)
        }
        
        if(storage.respLimit.get(msg.author.id) > 2){
          return  msg.channel.send('You have used up all your respects for today')
            //respect cooldown                                                                        
        }else if(storage.samePerson.get(msg.author.id) === memberInfo1.id){
          return  msg.channel.send("Didn't you just respect the user? 🤔")
            //restrict from giving respect to same person for two consecutive days
        }else{
        
            addSchema1.findOne({ userID : memberInfo1.id }, 'respect', async function(err, myUser){
                //fetch database info from mongoDB
                if(err) return console.log(err)
                if(!myUser){
                    //creates default data for user
                    const upScheme = new addSchema1({
                        _id: mongoose.Types.ObjectId(),
                        username: memberInfo1.displayName,
                        userID: memberInfo1.id,
                        birthday: 0,
                        respect: 0,
                        mood: 'none',
                        msgSent: 0,
                        vcTime: 0,
                        level: 1,
                        xp: 0,
                        time: msg.createdAt
                    })
                    await upScheme.save()
                    .then(result => console.log(result))
                    .catch(err => console.log(err))
                    msg.channel.send("It'll be like this sometimes. Give it another shot 🍷")
                }else{
                    
                    myUser.respect = myUser.respect + 1;
                    //add 1 point for the user
                    myUser.save()
                    .catch(err => console.log(err))
                
                    const embed = new Discord.RichEmbed()
                    .setTitle('Respect Award')
                    .addField(`**${memberInfo1.displayName}** has been respected!🔱`, `${randomCompliments}`)
                    .setColor(assets.respColor)
                    .setThumbnail(assets.respImg)
                    .setTimestamp()
                    .setFooter(`Respected by ${author}`, `${msg.author.avatarURL}`)
                    msg.channel.send(embed);
                    //sends message to the channel that they have been respected
                    respBoard.send(embed);
                    //sends message to respect board channel
                }
            })
        
            storage.respLimit.set(msg.author.id, storage.respLimit.get(msg.author.id) + 1)

            storage.samePerson.set(msg.author.id, memberInfo1.id);
            //add user ID in variable
            setTimeout(() => {
                storage.samePerson.delete(memberInfo1.id);
            }, 2 * 24 * 60 * 60 * 1000);
            //2 days
            //sets timeout to clear the userID

            
            setTimeout(() => {                                         
                storage.respLimit.delete(msg.author.id);
            }, 86400000);
            //24hrs    
            //3 respects per day                                           
        }
        return
    }
}