const mongoose = require('mongoose');
const addSchema1 = require('../models/addSchema.js')

module.exports = {
    name: "birthday",
    description: "Updates your birthday by using this format \`?birthday dd mm yyyy\`",
    aliases: ['birthdate', 'b'],
    execute(msg, args){
      
    

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
                    level: 1,
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