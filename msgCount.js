const addSchema1 = require('./addSchema.js');

module.exports = (msg) => {

    addSchema1.findOne({ userID: msg.author.id },['username','msgSent','birthday','respect','mood','msgSent'], async function(err, myUser){
        //find data in mongoDB based on member ID
        //the whole purpose of this structure is for counting the number of messages sent by the user and upload it in database
        if(err) return console.log(err)
        if(!myUser){
            //if there's no data, it creates new data
            const upScheme = new addSchema1({
            _id: mongoose.Types.ObjectId(),
                username: msg.author.username,
                userID: msg.author.id,
                birthday: 0,
                respect: 0,
                mood: 0,
                msgSent: 1,
                vcTime: 0,
                time: msg.createdAt
            })
            await upScheme.save()
            //saving the data
            .catch(err => console.log(err))
        }
         
        myUser.msgSent = myUser.msgSent + 1
        //adds 1 to current messages sent by the user
        myUser.username = msg.author.username
        //updates the username
        await myUser.save()
        .catch(err => console.log(err))
    }).catch(err => console.log(err))

}