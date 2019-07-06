const addSchema1 = require('../addSchema.js');

module.exports = {
    name: 'mood',
    description: 'sets the current mood of an user',
  
    execute(msg, args){
        
        
       
        
        if(!args[1]) return  msg.reply(`What? You're telling me you don't have any mood right now? :eyes: `);
               
        addSchema1.findOne({ userID: msg.author.id }, 'mood', async function(err, myUser){
            if(err) return console.log(err)

            if(!myUser){
                const upSchema = new addSchema1({
                    _id: mongoose.Types.ObjectId(),
                    username: msg.author.id,
                    userID: msg.author.id,
                    birthday: 0,
                    respect: 0,
                    mood: 0,
                    msgSent: 0,
                    vcTime: 0,
                    level: 1,
                    xp: 1,
                    time: msg.createdAt
                })
                await upSchema.save()
                .then(result => console.log(result))
                .catch(err => console.log(err))
                msg.channel.send("For first time, it'll be like this. Give it another shot 🍷")
            }
            newMood = args[1];
            myUser.mood = newMood
            myUser.save()
            .catch(err => console.log(err))
            msg.channel.send(`Your mood has been updated to "${newMood}"`)
        }).catch(err => console.log(err))
    }
}