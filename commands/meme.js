module.exports = {
    name: 'meme',
    desciption: 'sends a random meme',
    execute(msg){
        const randomPuppy = require('random-puppy');
        const Discord = require('discord.js');
        const memeChannel = msg.guild.channels.find(channel => channel.id == '576957550251999262');

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
    }
}