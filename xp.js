const lvlSchema = require('./levelSchema.js');

module.exports = (msg) => {

   

    lvlSchema.findOne({ userID: msg.author.id },["xp"], async function(err, myUser){
        //find data in mongoDB based on member ID
        //the whole purpose of this structure is for counting the number of messages sent by the user and upload it in database
        if(err) return console.log(err)
        if(!myUser){
            //if there's no data, it creates new data
            const upSchema = new lvlSchema({       
                _id: mongoose.Types.ObjectId(),
                username: msg.author.username,
                userID: msg.author.id,
                xp: 0,
                level: 1,
                guild: msg.guild.id            
            })
            upSchema.save()
            .catch(err => console.log(err))
            
           
        }
        
     
        var xp = await Math.floor(Math.random() * 3) + 1;
        let currXp = await myUser.xp;

        if(myUser.xp = NaN){
            myUser.xp = 0
        }
        
        myUser.xp = currXp + xp;
        myUser.save()
        .catch(err => console.log(err))

    }).catch(err => console.log(err))    
}