module.exports = {
    name: 'clear',
    description: 'clears chat in channel',
    execute(msg, args){
        if(msg.author.id != "264010327023288323") return msg.reply('Who are you?') //only me can use this command
        if(!args[1]) return msg.reply('Error please define second arg') //number of msgs need to be deleted
        return msg.channel.bulkDelete(args[1]);
    }
}