module.exports = (msg, Discord, args, memberInfo, avatarInfo, thisChannel) => {

    const mongoose = require('mongoose');
    const fs = require('fs');
    let birthday = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
    let mood = JSON.parse(fs.readFileSync('./mood.json', 'utf8'));
    const addSchema1 = require('./addSchema');
    
    let respects = JSON.parse(fs.readFileSync('./reputation.json', 'utf8'));

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
                var d = new Date(memberInfo.joinedAt),
                dformat = [d.getDate(),d.getMonth()+1,d.getFullYear()].join('/');

                var periods = {
                    month: 30 * 24 * 60 * 60 * 1000,
                    week: 7 * 24 * 60 * 60 * 1000,
                    day: 24 * 60 * 60 * 1000,
                    hour: 60 * 60 * 1000,
                    minute: 60 * 1000
                };

                var msgCreated = Date.now(msg.channel.createdAt)
                

                function formatTime(msgCreated, d) {
                    var diff = msgCreated - d;
                  
                    if (diff > periods.month) {
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
              

                if (memberInfo.roles.has(myRole.id)){                 //initiates member info
                    
                    if(!birthday[memberInfo.id]) birthday[memberInfo.id] = {
                        birthday : 0
                    };
                    if(!mood[memberInfo.id]) mood[memberInfo.id] = {
                        mood : 0
                    };
                    if(!respects[memberInfo.id]) respects[memberInfo.id] = {
                        respects : 0
                    };
                    let userData = birthday[memberInfo.id];
                    let userData2 = mood[memberInfo.id];
                    let userData3 = respects[memberInfo.id];
                    fs.writeFile('./data.json', JSON.stringify(birthday), (err) =>{
                        if(err) console.log(err)
                    });
                    fs.writeFile('./mood.json', JSON.stringify(mood), (err) =>{
                        if(err) console.log(err)
                    });
                    fs.writeFile('./reputation.json', JSON.stringify(respects), (err) =>{
                        if(err) console.log(err)
                    });
                    var memberPeriod = formatTime(msgCreated, d)

                    const embed = new Discord.RichEmbed()
                    .setTitle('Member Information')
                    .setColor(`${memberInfo.displayHexColor}`)
                    .addField('Name', `${memberInfo.displayName}`, true)
                    .addField('Team', `${myRole}`, true)
                    .addField('Birthday', `${userData.birthday}`, true)
                    .addField('Mood', `${userData2.mood}`, true)
                    .addField('Respects', `${userData3.respects} 🥇`)
                    .addField('Roles', memberInfo.roles.map(r => `${r}`).join('|'))
                    .addField('Joined since', `${dformat} (${memberPeriod})`)
                    .setThumbnail(`${pfp}`)
                    .setFooter('UN[SG-MY]©', 'https://i.imgur.com/TnNIYK6.png')
                    .setTimestamp()
                    return msg.channel.send(embed);
                }

                if (memberInfo.roles.has(sgRole.id)){        //initiates member info
                   
                    if(!birthday[memberInfo.id]) birthday[memberInfo.id] = {
                        birthday : 0
                    };
                    if(!mood[memberInfo.id]) mood[memberInfo.id] = {
                        mood : 0
                    };
                    if(!respects[memberInfo.id]) respects[memberInfo.id] = {
                        respects : 0
                    };
                    let userData = birthday[memberInfo.id];
                    let userData2 = mood[memberInfo.id];
                    let userData3 = respects[memberInfo.id];
                    fs.writeFile('./data.json', JSON.stringify(birthday), (err) =>{
                        if(err) console.log(err)
                    });
                    fs.writeFile('./mood.json', JSON.stringify(mood), (err) =>{
                        if(err) console.log(err)
                    });
                    fs.writeFile('./reputation.json', JSON.stringify(respects), (err) =>{
                        if(err) console.log(err)
                    });

                    var memberPeriod = formatTime(msgCreated, d)

                    const embed = new Discord.RichEmbed()                   
                    .setTitle('Member Information')
                    .setColor(`${memberInfo.displayHexColor}`)
                    .addField('Name', `${memberInfo.displayName}`, true)
                    .addField('Team', `${sgRole}`, true)
                    .addField('Birthday', `${userData.birthday}`, true)
                    .addField('Mood', `${userData2.mood}`, true)
                    .addField('Respects', `${userData3.respects} 🥇`)
                    .addField('Roles', memberInfo.roles.map(r => `${r}`).join('|'))
                    .addField('Joined since', `${dformat} (${memberPeriod})`)
                    .setThumbnail(`${pfp}`)
                    .setFooter('UN[SG-MY]©', 'https://i.imgur.com/TnNIYK6.png')
                    .setTimestamp()
                    return msg.channel.send(embed);      
                }  
               
            
            break;
           
            case 'birthday':
                
                if(!birthday[msg.author.id]) birthday[msg.author.id] = {
                    birthday : 0
                };
                if(!args[1] || !args[2] || !args[3]) return msg.reply("Invalid input! Please use dd mm yyyy format ")
                    
                
               
                let userData = birthday[msg.author.id];
    
                bDay = args[1] + "/" + args[2] + "/" + args[3];                
                userData.birthday = (bDay);
                fs.writeFile('./data.json', JSON.stringify(birthday), (err) =>{
                    if(err) console.log(err)
                });
                msg.reply(`Your birthday has been updated to "${bDay}"`)
                
            break;
            case 'mood':
                if(!mood[msg.author.id]) mood[msg.author.id] = {
                    mood : 0
                };
                if(!args[1]) return  msg.reply(`What? You're telling me you don't have any mood right now? :eyes: `);
                let userData1 = mood[msg.author.id];
                newMood = args[1];
                userData1.mood = (newMood);
                fs.writeFile('./mood.json', JSON.stringify(mood), (err) =>{
                    if(err) console.log(err)
                });
                msg.reply(`Your mood has been updated to "${newMood}"`)

            break;
            case 'cat':
               
                request.get('http://thecatapi.com/api/images/get?format=src&type=png',{

                }, function(error, response, body){
                    if(!error && response.statusCode == 200){
                        const embed = new Discord.RichEmbed()
                        .setImage(response.request.uri.href)
                        .setFooter(`requested by ${msg.author.username}`)
                        .setColor('24E2E7')
                        .setTimestamp()
                        return msg.channel.send(embed);
                    } else {
                        console.log(error)
                    }
                })
              
            break;
           case 'add':
              
                const upSchema = new addSchema1({
                    _id: mongoose.Types.ObjectId(),
                    username: msg.author.username,
                    userID: msg.author.id,
                    tarUser: memberInfo.displayName,
                    tarID: memberInfo.id,
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
                    addSchema1.findOne({ 'tarUser':`${memberInfo.displayName}` },['tarID','tarUser','motto'], function(err,addSchema1){
                        if(err) return console.log(err);
                        msg.channel.send(`Target user : ${addSchema1.tarUser} Target ID : ${addSchema1.tarID} Target motto: ${addSchema1.motto}`);
                    });
               }catch(err){
                   console.log(err)
               }

           break;
        }
    };

    


    if(args[0] == "clear"){
        if(!msg.author.id(264010327023288323)) return msg.reply('Who are you?') //only me can use this command
        if(!args[1]) return msg.reply('Error please define second arg') //number of msgs need to be deleted
        return msg.channel.bulkDelete(args[1]);
    }
};