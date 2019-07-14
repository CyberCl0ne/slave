

const mongoose = require('mongoose');
const assets = require('../local/assets.js')
const Discord = require('discord.js');
const lvlSchema = require('../models/levelSchema.js');
const addSchema1 = require('../models/addSchema.js');

module.exports = {
  name: 'info',
  description: 'Displays user profile. Commands : \`?info , ?info @user , ?info list\` \n You now can check other user profile without mentioning them, just use \`?info list\`',
  aliases: ['i', 'profile', 'p'],
  execute(msg, args, memberInfo, avatarInfo){
   
    var list = []

    var select = parseInt(args[1], 10);

    var member = msg.guild.members.filter(m => !m.user.bot).map(m => m);
        
    var myRole = msg.guild.roles.find(role => role.name == "Malaysia");
    var sgRole = msg.guild.roles.find(role => role.name == "Singapore");
    
    if (!memberInfo){
      
      var user = msg.guild.members.find(m => m.id === msg.author.id);
      var avatar = msg.author;
    } else {
      var user = memberInfo;
      var avatar = avatarInfo;
      msg.channel.send("Instead of mentioning user, why don't you just use \`?info list\`")
    }

    var rank = {};
    
        
    if (args[1] == myRole.name ){
        
      const embed = new Discord.RichEmbed()
      .setTitle('Team Information')
      .addField('Region', 'Malaysia')
      .setTimestamp()
      .setThumbnail(assets.myImg)
      .setColor(assets.myColor)
      .addField('Member', myRole.members.size)
      .setFooter( assets.trademark, assets.myImg)
      .setTimestamp()
      return msg.channel.send(embed);
    };

    if (args[1] == sgRole.name ){
        
      const embed = new Discord.RichEmbed()
      .setTitle('Team Information')
      .addField('Region', 'Singapore')
      .setTimestamp()
      .setThumbnail(assets.sgImg)
      .setColor(assets.sgColor)
      .addField('Member', sgRole.members.size)
      .setFooter(assets.trademark, assets.defaultImg)
      .setTimestamp()
      return msg.channel.send(embed);
    };

    if(args[1] === 'list'){
     
      for(i = 0; i < member.length; i++){
        list.push(`${i + 1}.  ${member[i].displayName}`)
      }
      return msg.channel.send('**List of members:** \n' + list.join('\n') + '\n\nTo check user profile just use \`?info <number>\`')
    }

    if(typeof select === 'number'){
      let index = select - 1;
      var user = member[index]
      var avatar = user.user
     

    }else if(typeof select === 'number' && select > member.size){
      return msg.channel.send('It seems like the user you trynna find is not there.')
    }
      
    
  

    var pfp = avatar.avatarURL
    var d = new Date(user.joinedAt)
    var d1 = new Date(avatar.createdAt)
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

    function progress(a){
      if(a >= 90){
        return ('⏹️⏹️⏹️⏹️⏹️⏹️⏹️⏹️⏹️➖')
      }else if(a >= 80){
        return ('⏹️⏹️⏹️⏹️⏹️⏹️⏹️⏹️➖➖')
      }else if(a >= 70){
        return ('⏹️⏹️⏹️⏹️⏹️⏹️⏹️➖➖➖')
      }else if(a >= 60){
        return ('⏹️⏹️⏹️⏹️⏹️⏹️➖➖➖➖')
      }else if(a >= 50){
        return ('⏹️⏹️⏹️⏹️⏹️➖➖➖➖➖')
      }else if(a >= 40){
        return ('⏹️⏹️⏹️⏹️➖➖➖➖➖➖')
      }else if(a >= 30){
        return ('⏹️⏹️⏹️➖➖➖➖➖➖➖')
      }else if(a >= 20){
        return ('⏹️⏹️➖➖➖➖➖➖➖➖')
      }else if(a >= 10){
        return ('⏹️➖➖➖➖➖➖➖➖➖')
      }else{
        return ('➖➖➖➖➖➖➖➖➖➖')
      }
    }
    
    if(pfp == undefined){
      var pfp = avatar.defaultAvatarURL
    }
      
    lvlSchema.findOne({ userID : user.id },['xp','level'], async function(err, myUser){
      if(err) return console.log(err);
      if(!myUser){
        //if there's no data, it creates new data
        const upScheme = new lvlSchema({
          _id: mongoose.Types.ObjectId(),
          username: msg.author.username,
          userID: msg.author.id,
          xp: 0,
          level: 1,
          guild: msg.guild.id
        })
        await upScheme.save()
        //saving the data
        .catch(err => console.log(err))
      }else{
        rank.xp = await myUser.xp;
        rank.level = await myUser.level;

      }
    }).catch(err => console.log(err));
          
    
    addSchema1.findOne({ userID : user.id },['birthday','respect','mood','msgSent','vcTime'],async function(err, myUser){
      if(err) return console.log(err);
      
      if(!myUser){
        const upSchema = new addSchema1({
          _id: mongoose.Types.ObjectId(),
          username: user.displayName,
          userID: user.id,
          birthday: 0,
          respect: 0,
          mood: 0,
          msgSent: 0,
          vcTime: 0,
          level: 1,
          xp: 1,
          time: msg.createdAt
        });
        await upSchema.save()
        .then(result => console.log(result))
        .catch(err => console.log(err));
        msg.channel.send("For first time, it'll be like this. Give it another shot 🍷")
      };
      
      if(err) return console.log(err);
      if (user.roles.has(myRole.id)){
      var team = myRole
      }else if (user.roles.has(sgRole.id)){
      var team = sgRole
      }else return;
      var userPeriod = formatTime1(msgCreated, d1)   
      var memberPeriod = formatTime(msgCreated, d)
      
      let birthday = await myUser.birthday;
      let mood = await myUser.mood;
      
      let roles = await user.roles.filter(r => r.name != "@everyone").map(r => r).join("|");

      let time = await myUser.vcTime;
      
      
      
      let respect = await myUser.respect;
      let messages = await myUser.msgSent;
      let converted = await convert(time);
      
      let level = await rank.level;
      let xp = await rank.xp;

      let percent = await Math.floor((((xp - ((level - 1) * 300)) / 300) * 100));
      const embed = new Discord.RichEmbed()
      
      .setTitle('Member Information')
      .setColor(`${user.displayHexColor}`)
      .addField('Name', `${user.displayName}`, true)
      .addField('Team', `${team}`, true)
      .addField('Birthday', `${birthday}`, true)
      .addField('Mood', `${mood}`, true)
      .addField('Respects', `${respect} 🥇`, true)
      .addField('Stats', `💬: ${messages} messages \n ${converted}`, true)
      .addField('Roles', `${roles}`)
      .addField('User info', ` \` Joined since: ${dformat} (${memberPeriod}) \n Account created on: ${d1format} (${userPeriod}) \` `)
      .addField('Level', `Lvl: ${level} | ${percent}% to level ${level + 1} \n ${progress(percent)}`)
      .setThumbnail(`${pfp}`)
      .setFooter(assets.trademark, assets.defaultImg)
      .setTimestamp()

      
      return msg.channel.send(embed);
          
          
          
    }).catch(err => console.log(err));
     
    delete rank.level;
    delete rank.xp;
  },
};