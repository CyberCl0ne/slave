module.exports = {
    name: "birthday",
    description: "updates birthday to database",
    aliases: ['birthdate', 'b'],
    execute(msg, args){
       const addSchema1 = require('../addSchema.js')

       

        if(!args[1] || !args[2] || !args[3]) return msg.reply("Invalid input! Please use dd mm yyyy format ");

        addSchema1.findOne({ userID: msg.author.id }, 'birthday', async function(err, myUser){
            if(err) return console.log(err);
            
            if(!myUser){
                const upSchema = new addSchema1({
                    _id: mongoose.Types.ObjectId(),
                    username: msg.author.displayName,
                    userID: msg.author.id,
                    birthday: 0,
                    respect: 0,
                    mood: 'none',
                    msgSent: 0,
                    vcTime: 0,
                    time: msg.createdAt
                });
                await upSchema.save()
                .then(result => console.log(result))
                .catch(err => console.log(err))
                msg.channel.send("For first time, it'll be like this. Give it another shot 🍷")
            }else{
              
                bDay = args[1] + "/" + args[2] + "/" + args[3];                
                
                myUser.birthday = bDay
                myUser.save()
                .catch(err => console.log(err))
                msg.channel.send(`Your birthday has been updated to "${bDay}"`)
                
            }

        }).catch(err => console.log(err))
        
            
    }
}