
module.exports = {
    name: 'stop',
    description: 'Stops the bot',
    execute(msg, bot,){
        if(msg.author.id === '264010327023288323'){
            msg.channel.send('logging out from discord')
            process.exit()
            .then(console.log("Logged out successfully"))
            .catch(err => console.log(err))
        }else{
            msg.reply("You don't have permission to execute this command.")
        }
    }
}