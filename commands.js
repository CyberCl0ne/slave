module.exports = (msg, Discord, args, memberInfo, avatarInfo, thisChannel, bot) => {

    const mongoose = require('mongoose');
    const randomPuppy = require('random-puppy');
   
    
    const addSchema1 = require('./addSchema.js');
    const foodChannel = msg.guild.channels.find(channel => channel.name == '🍗food');
    const catsChannel = msg.guild.channels.find(channel => channel.name == '😻cats');
    const memeChannel = msg.guild.channels.find(channel => channel.id == '576957550251999262');

    if(args[0] == 'help'){
        let myEmoji = bot.emojis.find(emoji => emoji.name === "malaysia");
        let sgEmoji = bot.emojis.find(emoji => emoji.name === "singapore");
    
        console.log(memberInfo);
        const embed = new Discord.RichEmbed()
        .setTitle('Bot Commands')
        .addField('?info Malaysia', `Displays info about Malaysia team ${myEmoji}`, true )
        .addField('?info Singapore', `Displays info about Singapore team ${sgEmoji}`)
        .addField('?birthday', 'Sets your birthday', true)
        .addField('?info @user', 'Displays info about mentioned user', true)      
        .addField('?mood', 'Sets your current mood', true)
        .addField('?ping', 'Gives you ping result for the bot', true)
        .addField('?meme ?cat ?food', 'Gives you random image at particular channel only', true)
        .addField('?respect @user  ?leaderboard   📌', 'Show your gratitude by giving them respect and check the leaderboard for the most respected user')
        .addField('?shoot ?hug ?kick ?slap ?fart   📌', 'Emotes to spice up the chat', true)
        .addField('Addition', '"📌" shows the commands that can be used in any channel')
        .setThumbnail('https://i.imgur.com/iwewYsx.png')
        .setTimestamp()
        .setColor('24E2E7')
        .setFooter('UN[SG-MY]©', 'https://i.imgur.com/TnNIYK6.png')
        return msg.channel.send(embed);
        

    };

    if(msg.channel.name == thisChannel.name || msg.channel.id === "576986467084140557"){
        switch(args[0]){
            case 'ping':
                msg.channel.send("Pinging ...") // Placeholder for pinging ... 
			    .then((msg) => { // Resolve promise
				msg.edit("Ping: " + (Date.now() - msg.createdTimestamp) + "ms" +"  "+"API latency: " + Math.round(bot.ping) + "ms") // Edits message with current timestamp minus timestamp of message
			});
                
            break;
            case 'website':
                msg.channel.send('youtube.com')
            break;
            case 'info':
                var myRole = msg.guild.roles.find(role => role.name === `Malaysia`);
                var sgRole = msg.guild.roles.find(role => role.name === `Singapore`);
                
         
            
                if (!args[1]){
                    return msg.reply('You need to specify which team or user')
                }

                if(!memberInfo){
                    
                    if (args[1] == myRole.name ){
                       
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
    
                    if (args[1] == sgRole.name ){
                        
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
                
                function convert(a){
                    console.log(a)
                    if (a > periods.hour){
                        var hour = Math.floor(a / periods.hour);
                        var remainder = a - hour * periods.hour;
                        if(remainder > periods.minute){
                            var mins = Math.floor(remainder / periods.minute);
                        }else{
                            var mins = 0
                        }
                        return `🔊: ${hour} hours, ${mins} mins `
                    }else if (a > periods.minute){
                        var hour = 0;
                        var mins = Math.floor(a / periods.minute);
                        return `🔊: ${hour} hours, ${mins} mins `
                    }else{
                        var hour = 0;
                        var mins = 0;
                        return `🔊: ${hour} hours, ${mins} mins `
                    }
                  
                   
                }
                
                if(pfp == undefined){
                    var pfp = avatarInfo.defaultAvatarURL
                }
                
                    
                try{
                    addSchema1.findOne({ userID : memberInfo.id },['userID','birthday','respect','mood','msgSent','vcTime'],async function(err,myUser){
                        if(err) return console.log(err);
                        
                            if(!myUser){
                                const upSchema = new addSchema1({
                                    _id: mongoose.Types.ObjectId(),
                                    username: memberInfo.displayName,
                                    userID: memberInfo.id,
                                    birthday: 0,
                                    respect: 0,
                                    mood: 0,
                                    msgSent: 0,
                                    vcTime: 0,
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
                        
                        let roles = await memberInfo.roles.filter(r => r.name != "@everyone").map(r => r).join("|");

                        var time = await myUser.vcTime;
                        
                       

                   
                        let respect = await myUser.respect;
                        let messages = await myUser.msgSent;
                        const embed = new Discord.RichEmbed()
                        
                        .setTitle('Member Information')
                        .setColor(`${memberInfo.displayHexColor}`)
                        .addField('Name', `${memberInfo.displayName}`, true)
                        .addField('Team', `${team}`, true)
                        .addField('Birthday', `${birthday}`, true)
                        .addField('Mood', `${mood}`, true)
                        .addField('Respects', `${respect} 🥇`, true)
                        .addField('Stats', `💬: ${messages} messages \n ${convert(time)}`, true)
                        .addField('Roles', `${roles}`)
                        .addField('User info', ` \` Joined since: ${dformat} (${memberPeriod}) \n Account created on: ${d1format} (${userPeriod}) \` `)
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
                            msgSent: 0,
                            vcTime: 0,
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
                            msgSent: 0,
                            vcTime: 0,
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
            case 'leaderboard':
                
                addSchema1.find({
                    __v : 0
                }).sort([
                    ['respect','descending']
                ]).exec((err, res) => {
                    if(err) console.log(err)

                    let embed = new Discord.RichEmbed()
                   
                    .setTimestamp()
                    .setFooter('UN[SG-MY]©', 'https://i.imgur.com/TnNIYK6.png')
                    .setColor('FFD700')
                    .setThumbnail('https://i.redd.it/06hdr24vpiuy.png')
                   
                    if(res.length === 0){
                        embed.setColor('RED')
                        embed.addField('No data found')

                    }else if(res.length < 10){
                        
                        for(i = 0; i < res.length; i++){
                            let member = msg.guild.members.get(res[i].userID) || "USER LEFT"
                            if(member === "USER LEFT"){
                                embed.addField(`${i + 1}. ${member}`, `**respects**: ${res[i].respect}`);
                            }else if(i + 1 == 1){
                                embed.addField(`${i + 1}. ${member.user.username} 🥇`, `**respects**: ${res[i].respect}`);
                            }else if(i + 1 == 2){
                                embed.addField(`${i + 1}. ${member.user.username} 🥈`, `**respects**: ${res[i].respect}`);
                            }else if(i + 1 == 3){
                                embed.addField(`${i + 1}. ${member.user.username} 🥉`, `**respects**: ${res[i].respect}`);
                            }else{
                                embed.addField(`${i + 1}. ${member.user.username}`, `**respects**: ${res[i].respect}`);
                            }
                        }

                    }else{
                        var list = []
                        for(i = 0; i < 10; i++){
                            let member = msg.guild.members.get(res[i].userID) || "USER LEFT"
                            if(member === "USER LEFT"){
                                list.push(` ${i + 1}. ${member} ${res[i].respect}`); 
                            }else if(i + 1 == 1){
                                list.push(` ${i + 1}. ${member.user.username} 🥇 | ${res[i].respect}`);
                            }else if(i + 1 == 2){
                                list.push(` ${i + 1}. ${member.user.username} 🥈 | ${res[i].respect}`);
                            }else if(i + 1 == 3){
                                list.push(` ${i + 1}. ${member.user.username} 🥉 | ${res[i].respect}`);
                            }else{
                                list.push(` ${i + 1}. ${member.user.username} | ${res[i].respect}`);
                            }
                            
                        }
                    }
                    if(userLeft === undefined){
                        var userLeft = " "
                    }
                    embed.addField('Respect Leaderboard 🏆', list.join('\n'))
                    msg.channel.send(embed);
                })
                
               
            break;
        }

    };
   

    if(args[0] == 'food'){
        if(msg.channel.name == foodChannel.name){
            msg.channel.send('Hold on...🍷')
            .then((msg) => {
              msg.delete(3000)
            }).catch(err => console.log(err));
            randomPuppy('FoodPorn').then( URL => { 
                var embed = new Discord.RichEmbed()
                .setImage(URL)
                .setTimestamp()
                .setColor('24E2E7')
                msg.channel.send(embed)     
            }).catch(err => console.log(err));
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
            randomPuppy('Catmemes').then( URL => {
               var embed = new Discord.RichEmbed()
                .setImage(URL)
                .setTimestamp()
                .setColor('24E2E7')
                msg.channel.send(embed)
            }).catch(err => console.log(err));
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
            randomPuppy('me_irl').then( URL => {
                var embed = new Discord.RichEmbed()
                .setImage(URL)
                .setTimestamp()
                .setColor('24E2E7')
                msg.channel.send(embed)
            }).catch(err => console.log(err));
        }else{
            return msg.channel.send('Meme channel is not here')
        };
    };                   
        


    if(args[0] == "clear"){
        if(msg.author.id != "264010327023288323") return msg.reply('Who are you?') //only me can use this command
        if(!args[1]) return msg.reply('Error please define second arg') //number of msgs need to be deleted
        return msg.channel.bulkDelete(args[1]);
    }
};