module.exports = (msg, Discord, args, memberInfo, avatarInfo, thisChannel) => {

    const mongoose = require('mongoose');
    const randomPuppy = require('random-puppy');
   
    const addSchema1 = require('./addSchema.js');
    const foodChannel = msg.guild.channels.find(channel => channel.name == '🍗food');
    const catsChannel = msg.guild.channels.find(channel => channel.name == '😻cats');
    const memeChannel = msg.guild.channels.find(channel => channel.id == '576957550251999262');
  

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
                var d = new Date(memberInfo.joinedAt)
                var d1 = new Date(avatarInfo.createdAt)
                dformat = [d.getDate(),d.getMonth()+1,d.getFullYear()].join('/');
                d1format = [d1.getDate(),d.getMonth()+1,d1.getFullYear()].join('/');

                var periods = {
                    year: 12 * 30 * 24 * 60 * 60 * 1000,
                    month: 30 * 24 * 60 * 60 * 1000,
                    week: 7 * 24 * 60 * 60 * 1000,
                    day: 24 * 60 * 60 * 1000,
                    hour: 60 * 60 * 1000,
                    minute: 60 * 1000
                };

                var msgCreated = Date.now(msg.channel.createdAt)
                
                function formatTime1(msgCreated, d1) {
                    var diff = msgCreated - d1;
                    if(diff > periods.year){
                      return Math.floor(diff / periods.year) + " years";
                    }else if (diff > periods.month) {
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

                function formatTime(msgCreated, d) {
                    var diff = msgCreated - d;
                    if(diff > periods.year){
                      return Math.floor(diff / periods.year) + " years";
                    }else if (diff > periods.month) {
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
        
                    
                try{
                    addSchema1.findOne({ userID : memberInfo.id },['userID','birthday','respect','mood'],async function(err,myUser){
                        if(err) return console.log(err);
                        
                            if(!myUser){
                                const upSchema = new addSchema1({
                                    _id: mongoose.Types.ObjectId(),
                                    username: memberInfo.displayName,
                                    userID: memberInfo.id,
                                    birthday: 0,
                                    respect: 0,
                                    mood: 0,
                                    time: msg.createdAt
                                });
                                await upSchema.save()
                                .then(result => console.log(result))
                                .catch(err => console.log(err));
                                msg.channel.send("For first time, it'll be like this. Give it another shot 🍷")
                            };
                        
                        if(err) return console.log(err);
                        if (memberInfo.roles.has(myRole.id)){
                            var team = myRole
                        }else if (memberInfo.roles.has(sgRole.id)){
                            var team = sgRole
                        }else return;
                        var userPeriod = formatTime1(msgCreated, d1)   
                        var memberPeriod = formatTime(msgCreated, d)
                        let birthday = await myUser.birthday;
                        let mood = await myUser.mood;
                        let respect = await myUser.respect;
                        const embed = new Discord.RichEmbed()
                        
                        .setTitle('Member Information')
                        .setColor(`${memberInfo.displayHexColor}`)
                        .addField('Name', `${memberInfo.displayName}`, true)
                        .addField('Team', `${team}`, true)
                        .addField('Birthday', `${birthday}`, true)
                        .addField('Mood', `${mood}`, true)
                        .addField('Respects', `${respect} 🥇`)
                        .addField('Roles', memberInfo.roles.map(r => `${r}`).join('|'))
                        .addField('User info', `Joined since: ${dformat} (${memberPeriod}) \n Account created on: ${d1format} (${userPeriod})`)
                        .setThumbnail(`${pfp}`)
                        .setFooter('UN[SG-MY]©', 'https://i.imgur.com/TnNIYK6.png')
                        .setTimestamp()
                        return msg.channel.send(embed);
                        
                        
                        
                    }).catch(err => console.log(err));
                }catch(err){
                    console.log(err)
                }
                   
            break;
           
            case 'birthday':
                
                if(!args[1] || !args[2] || !args[3]) return msg.reply("Invalid input! Please use dd mm yyyy format ")

                addSchema1.findOne({ userID: msg.author.id }, 'birthday', async function(err, myUser){
                    if(err) return console.log(err);
                    
                    if(!myUser){
                        const upSchema = new addSchema1({
                            _id: mongoose.Types.ObjectId(),
                            username: msg.author.displayName,
                            userID: msg.author.id,
                            birthday: 0,
                            respect: 0,
                            mood: 'none',
                            time: msg.createdAt
                        });
                        await upSchema.save()
                        .then(result => console.log(result))
                        .catch(err => console.log(err))
                        msg.channel.send("For first time, it'll be like this. Give it another shot 🍷")
                    }else{
                      
                        bDay = args[1] + "/" + args[2] + "/" + args[3];                
                        
                        myUser.birthday = bDay
                        myUser.save()
                        .catch(err => console.log(err))
                        msg.channel.send(`Your birthday has been updated to "${bDay}"`)
                        
                    }

                }).catch(err => console.log(err))
                
                    
                
               
                
            break;
            case 'mood':
               
                if(!args[1]) return  msg.reply(`What? You're telling me you don't have any mood right now? :eyes: `);
               
                addSchema1.findOne({ userID: msg.author.id }, 'mood', async function(err, myUser){
                    if(err) return console.log(err)

                    if(!myUser){
                        const upSchema = new addSchema1({
                            _id: mongoose.Types.ObjectId(),
                            username: msg.author.id,
                            userID: msg.author.id,
                            birthday: 0,
                            respect: 0,
                            mood: 0,
                            time: msg.createdAt
                        })
                        await upSchema.save()
                        .then(result => console.log(result))
                        .catch(err => console.log(err))
                        msg.channel.send("For first time, it'll be like this. Give it another shot 🍷")
                    }
                    newMood = args[1];
                    myUser.mood = newMood
                    myUser.save()
                    .catch(err => console.log(err))
                    msg.channel.send(`Your mood has been updated to "${newMood}"`)
                }).catch(err => console.log(err))
               
               

            break;
            
            case 'add':
              
                const upSchema = new addSchema1({
                    _id: mongoose.Types.ObjectId(),
                    username: msg.author.username,
                    userID: msg.author.id,
                    birthday: 'none',
                    motto: args[2],
                    time: msg.createdAt
                });
                upSchema.save()
                .then(result => console.log(result))
                .catch(err => console.log(err));

                msg.reply('The data has been saved')
            break;
            case 'fetch':
               try{
                    addSchema1.findOne({ 'userID':`${memberInfo.id}` },['birthday','respect','motto'], function(err,addSchema1){
                        if(err) return console.log(err);
                        if(!addSchema1.userID){
                            const upSchema = new addSchema1({
                                _id: mongoose.Types.ObjectId(),
                                username: msg.author.username,
                                userID: msg.author.id,
                                birthday: memberInfo.displayName,
                                respect: 0,
                                motto: 'none',
                                time: msg.createdAt
                            });
                            upSchema.save()
                            .then(result => console.log(result))
                            .catch(err => console.log(err));
                        }
                        msg.channel.send(`Target user : ${addSchema1.tarUser} Target ID : ${addSchema1.tarID} Target motto: ${addSchema1.motto}`);
                    });
               }catch(err){
                   console.log(err)
               }

            break;
            case 'update':
               try{
                    addSchema1.findOne({ 'userID':`${msg.author.id}` },'motto', function(err,addSchema1){
                        if(err) return console.log(err);
                        if(!addSchema1.motto){
                            const upSchema = new addSchema1({
                                _id: mongoose.Types.ObjectId(),
                                username: msg.author.username,
                                userID: msg.author.id,
                                tarUser: memberInfo.displayName,
                                tarID: memberInfo.id,
                                motto: 'none',
                                time: msg.createdAt
                            });
                            upSchema.save()
                            .then(result => console.log(result))
                            .catch(err => console.log(err));
                        }else{
                            addSchema1.motto = args[1];
                            addSchema1.save()
                            .catch(err => console.log(err));
                        }
                    }).catch(err => console.log(err));
                  }catch(err){
                   console.log(err)
                };
            break;
        }
    };
   

    if(args[0] == 'food'){
        if(msg.channel.name == foodChannel.name){
            msg.channel.send('Hold on...🍷')
            .then((msg) => {
              msg.delete(3000)
            }).catch(err => console.log(err));
            randomPuppy('FoodPorn').then(   
                URL => msg.channel.send(URL)
            ).catch(err => console.log(err));
        }else{
          return  msg.channel.send('🥥 #food channel please')
        };
    };   
    if(args[0] == 'cat'){
        if(msg.channel.name == catsChannel.name){
            msg.channel.send('Hold on...🍷')
            .then((msg) => {
              msg.delete(3000)
            }).catch(err => console.log(err));
            randomPuppy('Catmemes').then(
              URL => msg.channel.send(URL)
            ).catch(err => console.log(err));
        }else{
            return msg.channel.send('Nyiaaaaaaw! use #cats channel 🐱')
        };
    };     
    if(args[0] == 'meme'){
        if(msg.channel.id == memeChannel.id){
            msg.channel.send('Hold on...🍷')
            .then((msg) => {
              msg.delete(3000)
            }).catch(err => console.log(err));
            randomPuppy('me_irl').then(
                URL => msg.channel.send(URL)
            ).catch(err => console.log(err));
        }else{
            return msg.channel.send('Meme channel is not here')
        };
    };                   
        


    if(args[0] == "clear"){
        if(!msg.author.id(264010327023288323)) return msg.reply('Who are you?') //only me can use this command
        if(!args[1]) return msg.reply('Error please define second arg') //number of msgs need to be deleted
        return msg.channel.bulkDelete(args[1]);
    }
};