module.exports = {
    name: 'eval',
    description: 'nothing',
    async execute(msg, args, bot){
        if(msg.author.id != '264010327023288323') return msg.channel.send("You don't have the permission to execute the command.~");
        //eval command for testing purposes

        let evaled;
        try{
            evaled = await eval(args[1]);
            msg.channel.send(inspect(evaled));
            console.log(inspect(evaled));
        }catch(err){
            console.log(err);
            msg.channel.send("There was an error during evaluation.");
        }
    }
}