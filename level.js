const lvlSchema = require('./levelSchema.js');
const mongoose = require('mongoose');

module.exports = (msg) => {
   
    function giveRole(a, member){
        if(a == 5){
            member.addRole('577456261906300938')
        }else if(a == 10){
            member.addRole('577456355271770112')
        }else if(a == 10){
            member.addRole('577456355271770112')
        }else if(a == 15){
            member.addRole('577456646381502464')
        }else if(a == 20){
            member.addRole('577461890037579777')
        }else if(a == 25){
            member.addRole('577462562140979202')
        }else if(a == 30){
            member.addRole('577462667430723584')
        }else if(a == 35){
            member.addRole('577462847035015169')
        }else if(a == 50){
            member.addRole('583222341719425024')
        }else if(a == 60){
            member.addRole('591949236426375169')
        }else if(a == 70){
            member.addRole('591950386814779403')
        }else if(a == 80){
            member.addRole('591949681723047936')
        }else if(a == 90){
            member.addRole('591951311331917826')
        }else if(a == 100){
            member.addRole('591952361132523532')
        }
    }

    lvlSchema.findOne({ userID: msg.author.id },['level','xp'], async function(err, myUser){
        //find data in mongoDB based on member ID
        //the whole purpose of this structure is for counting the number of messages sent by the user and upload it in database
        if(err) return console.log(err)
        if(!myUser){
            //if there's no data, it creates new data
            const upScheme = new lvlSchema({
                _id: mongoose.Types.ObjectId(),
                username: msg.author.username,
                userID: msg.author.id,
                xp: 0,
                level: 1,
                guild: msg.guild.id
            })
            await upScheme.save()
            //saving the data
            .catch(err => console.log(err))


        }
        var nextLvl = await myUser.level * 100;

       
        
        if(myUser.xp >= nextLvl){
            let member = msg.guild.members.find(m => m.id == msg.author.id);
            let newLvl = myUser.level + 1;
            myUser.level = myUser.level + 1;
            giveRole(myUser.level, member);
           
            msg.channel.send(`Congrats! you have ranked up to level ${newLvl}!`)
            
        }
      
       myUser.save()
        .catch(err => console.log(err))
        

    }).catch(err => console.log(err));
}