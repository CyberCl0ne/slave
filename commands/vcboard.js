const assets = require('../local/assets.js');
const Discord = require('discord.js');
const addSchema1 = require('../models/addSchema.js');

module.exports = {
  name: 'vcboard',
  description: 'Shows data of vc time',
  aliases: ['vcb', 'voiceboard'],
  execute(msg){




    addSchema1.find({ __v : 0 }).sort([
    ['vcTime','descending']
    ]).exec((err, res) => {
    if(err) console.log(err);

    let embed = new Discord.RichEmbed()
    .setColor(assets.defaultColor)
    .setFooter(assets.trademark, assets.defaultImg)
    .setTimestamp()
    .setThumbnail(assets.vcImg)

    var periods = {
      year: 12 * 30 * 24 * 60 * 60 * 1000,
      month: 30 * 24 * 60 * 60 * 1000,
      week: 7 * 24 * 60 * 60 * 1000,
      day: 24 * 60 * 60 * 1000,
      hour: 60 * 60 * 1000,
      minute: 60 * 1000
    };

    function convert(a){

      if (a > periods.hour){
        var hour = Math.floor(a / periods.hour);
        var remainder = a - hour * periods.hour;
        if(remainder > periods.minute){
          var mins = Math.floor(remainder / periods.minute);
        }else{
          var mins = 0
        }
          return ` \`${hour} hours, ${mins} mins\` `
        }else if (a > periods.minute){
          var hour = 0;
          var mins = Math.floor(a / periods.minute);
          return ` \`${hour} hours, ${mins} mins\` `
        }else{
          var hour = 0;
          var mins = 0;
          return ` \`${hour} hours, ${mins} mins\` `
        }
      }



      var list = [];
      for(i = 0; i < 10 ; i++){
        let member = msg.guild.members.get(res[i].userID)

        list.push(`${i + 1}. ${member.user.username} | ${convert(res[i].vcTime)}`)

      }
      embed.addField('VC time data', list.join('\n'))
      msg.channel.send(embed);
    })
          
  }
}