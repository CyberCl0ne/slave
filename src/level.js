const lvlSchema = require('../models/levelSchema.js');


module.exports = (msg) => {
   
    function giveRole(a, member){
        if(a == 5){
            member.addRole('577456261906300938')
        }else if(a == 10){
            member.addRole('577456355271770112')
            .then(member.removeRole('577456261906300938'))
            .catch(err => console.log(err))
        }else if(a == 15){
            member.addRole('577456646381502464')
            .then(member.removeRole('577456355271770112'))
            .catch(err => console.log(err))
        }else if(a == 20){
            member.addRole('577461890037579777')
            .then(member.removeRole('577456646381502464'))
            .catch(err => console.log(err))
        }else if(a == 25){
            member.addRole('577462562140979202')
            .then(member.removeRole('577461890037579777'))
            .catch(err => console.log(err))
        }else if(a == 30){
            member.addRole('577462667430723584')
            .then(member.removeRole('577462562140979202'))
            .catch(err => console.log(err))
        }else if(a == 35){
            member.addRole('577462847035015169')
            .then(member.removeRole('577462667430723584'))
            .catch(err => console.log(err))
        }else if(a == 50){
            member.addRole('583222341719425024')
            .then(member.removeRole('577462847035015169'))
            .catch(err => console.log(err))
        }else if(a == 60){
            member.addRole('591949236426375169')
            .then(member.removeRole('583222341719425024'))
            .catch(err => console.log(err))
        }else if(a == 70){
            member.addRole('591950386814779403')
            .then(member.removeRole('591949236426375169'))
            .catch(err => console.log(err))
        }else if(a == 80){
            member.addRole('591949681723047936')
            .then(member.removeRole('591950386814779403'))
            .catch(err => console.log(err))
        }else if(a == 90){
            member.addRole('591951311331917826')
            .then(member.removeRole('591949681723047936'))
            .catch(err => console.log(err))
        }else if(a == 100){
            member.addRole('591952361132523532')
           .then(member.removeRole('591951311331917826'))
           .catch(err => console.log(err))
        }
    }

    lvlSchema.findOne({ userID: msg.author.id },['level','xp'], async function(err, myUser){
        //find data in mongoDB based on member ID
        //the whole purpose of this structure is for counting the number of messages sent by the user and upload it in database
        if(err) return console.log(err)
       
        var nextLvl = await myUser.level * 300;

       
        
        if(myUser.xp >= nextLvl){
            let member = msg.guild.members.find(m => m.id == msg.author.id);
            let newLvl = myUser.level + 1;
            myUser.level = myUser.level + 1;
            giveRole(myUser.level, member);
           
            msg.channel.send(`Congrats! ${member.nickname} you have ranked up to level ${newLvl}!`)
            
        }
      
       myUser.save()
        .catch(err => console.log(err))
        

    }).catch(err => console.log(err));
}