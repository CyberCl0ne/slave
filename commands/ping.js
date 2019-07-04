
module.exports = {
    name: 'ping',
    description: 'Ping!',
    execute(msg) {
        msg.channel.send("Pinging ...") // Placeholder for pinging ... 
        .then((msg) => { // Resolve promise
        msg.edit("Ping: " + (Date.now() - msg.createdTimestamp) + "ms")
        }); // Edits message with current timestamp minus timestamp of message
    },
};