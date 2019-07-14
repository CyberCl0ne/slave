const randomPuppy = require('random-puppy');
const Discord = require('discord.js');
module.exports = {
  name: 'food',
  description: 'Sends random image of food at food channel',
  execute(msg){
    
    const foodChannel = msg.guild.channels.find(channel => channel.name == '🍗food');
      
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
  }
}