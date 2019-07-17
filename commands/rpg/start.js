const rpgSchema = require('../../models/rpgSchema.js');
const mongoose = require('mongoose');
module.exports = {
    name: 'start',
    description: 'Starts a character for a RPG game',
    async execute(msg){
      
      

      function setName(m){
        rpgSchema.findOne({ userID: m.author.id },['charName'],async (err, res) => {
            if(err) return console.log(err) 
            if(!res){
                const upSchema = new rpgSchema({
                    _id: mongoose.Types.ObjectId(),
                    username: m.author.username,
                    userID: m.author.id,
                    name: m.content,
                    class: "none",
                    stats: [
                        {
                            win: 0,
                            loss: 0,
                            money: 0,
                            health: 100,
                            attack: 100,
                            defense: 100,
                            level: 1
                        }
                    ]
                })
                await upSchema.save()
                .catch(err => console.log(err))
            }else{
              msg.channel.send("It looks like you have created a character.")
            }
           
        }).catch(err => console.log(err))
      }

      const filter = m => m.author.id == msg.author.id

      msg.channel.send("Please give a name for your champion").then(() => {
        msg.channel.awaitMessages(filter, { max: 1, time: 10000, errors: ['time']})
        .then(collected => {
            setName(collected.first())
            msg.channel.send(`We have waited for you ${collected.first().content}!`)
        })
        .catch(collected => {
            msg.channel.send("Time's up for you to create the character.")
            console.log(collected.first().content)
        })
      })
    }
}