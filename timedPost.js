module.exports = (msg) => {
const randomPuppy = require('random-puppy');
const foodChannel = msg.guild.channels.find(channel => channel.name == '🍗food');
const catsChannel = msg.guild.channels.find(channel => channel.name == '😻cats');
const memeChannel = msg.guild.channels.find(channel => channel.id == '576957550251999262');

setTimeout(() => randomPuppy('Catmemes').then(
    URL => catsChannel.send(URL) 
  ).catch(err => console.log(err)), 1 * 24 * 60 * 60 * 1000);

  setTimeout(() => randomPuppy('Foodporn').then(
    URL => foodChannel.send(URL)
  ).catch(err => console.log(err)), 1 * 24 * 60 * 60 * 1000);

  setTimeout(() => randomPuppy('me_irl').then(
    URL =>  memeChannel.send(URL)
  ).catch(err => console.log(err)), 1 * 24 * 60 * 60 * 1000);

};