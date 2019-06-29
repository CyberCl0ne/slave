module.exports = (msg) => {
const randomPuppy = require('random-puppy');
const foodChannel = msg.guild.channels.find(channel => channel.name == '🍗food');
const catsChannel = msg.guild.channels.find(channel => channel.name == '😻cats');
const memeChannel = msg.guild.channels.find(channel => channel.id == '576957550251999262');

setTimeout(() => randomPuppy('Catmemes').then( URL =>{
  var embed = new Discord.Richembed()
  .setImage(URL)
  .setTimestamp()
  .setColor('24E2E7')
 return catsChannel.send(embed)
}).catch(err => console.log(err)), 1 * 6 * 60 * 60 * 1000);

setTimeout(() => randomPuppy('Foodporn').then(URL => {
  var embed = new Discord.Richembed()
  .setImage(URL)
  .setTimestamp('24E2E7')
  .setColor()
 return foodChannel.send(embed)
}).catch(err => console.log(err)), 1 * 6 * 60 * 60 * 1000);

setTimeout(() => randomPuppy('me_irl').then( URL =>{
  var embed = new Discord.Richembed()
  .setImage(URL)
  .setColor('24E2E7')
  .setTimestamp()
 return memeChannel.send(embed)
}).catch(err => console.log(err)), 1 * 6 * 60 * 60 * 1000);

};
