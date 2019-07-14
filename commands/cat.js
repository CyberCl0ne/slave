module.exports = {
    name: 'cat',
    description: 'Sends random cat image at cats channel',
    execute(msg){
        const randomPuppy = require('random-puppy');
        const Discord = require('discord.js');
        const catsChannel = msg.guild.channels.find(channel => channel.name == '😻cats');

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
    }
}