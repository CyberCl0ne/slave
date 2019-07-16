const addSchema = require('../models/addSchema.js');
const Discord = require('discord.js');
const assets = require('../local/assets.js');
const storage = require('../local/storage.js')
module.exports = (msg) => {
   
  var date = new Date()
  function birthday(){
    addSchema.find({ __v : 0},['birthday','userID'], async function(err, myUser){
      if(err) return console.log(err);
      for(i = 1; i < myUser.length; i++){
        storage.birthday.set(myUser[i].birthday.slice(0, 4), myUser[i].id)
      }
    }).catch(err => console.log(err))

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var dayStr = day.toString();
    var monthStr = month.toString();
    var dayM = modify(dayStr);
    var monthM = modify(monthStr);

    var fDate = `${dayM}/${monthM}`
    
    if(storage.birthday.has(fDate)){
      let channel = msg.guild.channels.find(c => c.name == '📣announcements');
      let member = msg.guild.members.find(m => m.id == storage.birthday.get(fDate));
      const embed = new Discord.RichEmbed()
      .setColor(assets.defaultColor)
      .setFooter(assets.trademark, assets.trademark)
      .setThumbnail(`${member.user.avatarURL}`)
      .addField(`Happy birthday ${member.displayName} 🎉🎉`, ` 🍰 ${dayW(dayM)} ${monthW(monthM)} 🍰`)
      channel.send(embed)
    } 
  }

  function modify(x){
    if(x.length < 2){
      return  `0${x}`
    }else{
      return x
    }
  }

  function dayW(x){
    if(x == '01'){
      return  "1st"
    }else if(x == '02'){
      return "2nd"
    }else{
      return `${x}rd`
    }
  }

  function monthW(x){
    switch(x){
      case '01':
        "January"
      break;
      case '02':
        "February"
      break;
      case '03':
        "March"
      break;
      case '04':
        "April"
      break;
      case '05':
        "May"
      case '06':
        "June"
      break;
      case '07':
        "July"
      break;
      case '08':
        "August"
      break;
      case '09':
        "September"
      break;
      case '10':
        "October"
      break;
      case '11':
        "November"
      break;
      case '12':
        "December"
      break;
    }

  }

  setInterval(() => {
    birthday()
  }, 1 * 60 * 60 * 1000);

}