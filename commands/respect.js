module.exports = {
    name: 'respect',
    description: 'give respect to other user',
    execute(msg, respLimit, samePerson){
       
        
        var respLimit = new Map();
        const Discord = require('discord.js');
        var samePerson = new Set();

        const addSchema1 = require('../addSchema.js');

        //A feature to give respect to other members
    
        let memberInfo1 = msg.mentions.members.first();

       
                
        let author = msg.guild.members.get(msg.author.id).displayName;
        const respBoard = msg.guild.channels.find( channel => channel.name == '🏅respect-board');
     
        if(!memberInfo1) return msg.reply('You need to tell me which user you want to respect')
         
        if(msg.author.id === memberInfo1.id){
             return msg.reply("You can't give respect to yourself 😜");                                                                       
        }; //prevent users from giving respect to themselves
         
        
        let compliments = ["You've proved your worthiness","A knight with shining armour","What an honor!","King Arthur himself bows down to you","May your day blessed",
             "With the highest regard","It ain't much but it honest work","You should be proud of yourself","You have impeccable manners",
             "You're more helpful than you realize","Your kindness is a balm to all who encounter it",
             "You're even more beautiful in the inside than you're on the outside","You're a candle in the darkness",
             "You're a gift to those who are around you","You're breathtaking"]
        var randomCompliments = compliments[Math.floor(Math.random() * compliments.length)];                                           
        //randomize compliments
 
        if(!respLimit.has(msg.author.id)){
            respLimit.set(msg.author.id, 0);
        }else{
            respLimit.set(msg.author.id, respLimit.get(msg.author.id) + 1)
        }

        if(respLimit.get(msg.author.id) > 3){
            msg.channel.send('You have used up all your respects for today')
            //respect cooldown                                                                        
        }else if(samePerson.has(memberInfo1.id)){
            msg.channel.send("Didn't you just respect the user? 🤔")
            //restrict from giving respect to same person for two consecutive days
        }else{
        
            addSchema1.findOne({ userID : memberInfo1.id }, 'respect', async function(err, myUser){
                //fetch database info from mongoDB
                if(err) return console.log(err)
                if(!myUser){
                    //creates default data for user
                    const upScheme = new addScheme1({
                        _id: mongoose.Types.ObjectId(),
                        username: memberInfo1.displayName,
                        userID: memberInfo1.id,
                        birthday: 0,
                        respect: 0,
                        mood: 'none',
                        msgSent: 1,
                        vcTime: 0,
                        time: msg.createdAt
                    })
                    await upScheme.save()
                    .then(result => console.log(result))
                    .catch(err => console.log(err))
                    
                }else{
                    
                    myUser.respect = myUser.respect + 1;
                    //add 1 point for the user
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
                    //sends message to the channel that they have been respected
                    respBoard.send(embed);
                    //sends message to respect board channel
                }
            })
        
        

            samePerson.add(memberInfo1.id);
            //add user ID in variable
            setTimeout(() => {
                samePerson.delete(memberInfo1.id);
            }, 2 * 24 * 60 * 60 * 1000);
            //24 hours
            //sets timeout to clear the userID

            
            setTimeout(() => {                                         
                respLimit.delete(msg.author.id);
            }, 86400000);
            //24hrs    
            //3 respects per day                                           
        }
        return
    }
}