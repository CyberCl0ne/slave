const addSchema1 = require('./addSchema.js');

module.exports = (msg) => {

    var newValue = { $set: { xp: 1 } }

    addSchema1.findOneAndUpdate({ userID: msg.author.id }, newValue,["xp"], async function(err, myUser){
        //find data in mongoDB based on member ID
        //the whole purpose of this structure is for counting the number of messages sent by the user and upload it in database
        if(err) return console.log(err)
        if(!myUser){
            //if there's no data, it creates new data
            const upSchema = new addSchema1({
                _id: mongoose.Types.ObjectId(),
                username: msg.author.username,
                userID: msg.author.id,
                birthday: 0,
                respect: 0,
                mood: 0,
                msgSent: 1,
                vcTime: 0,
                level: 1,
                xp: 0,
                time: msg.createdAt
            })
            upSchema.save()
            .catch(err => console.log(err))
            
           
        }
        
     
        var xp = await Math.floor(Math.random() * 15) + 1;
        
        if(myUser.xp = NaN){
            myUser.xp = 0
        }
        myUser.xp = myUser.xp + xp

        myUser.save()
        .catch(err => console.log(err))

    }).catch(err => console.log(err))    
}