module.exports = {
    name: 'ping',
    description: 'Ping!',
    execute(msg, bot) {
        msg.channel.send("Pinging ...") // Placeholder for pinging ... 
        .then((msg) => { // Resolve promise
        msg.edit("Ping: " + (Date.now() - msg.createdTimestamp) + "ms" +"  "+"API latency: " + Math.round(bot.ping) + "ms")
        }); // Edits message with current timestamp minus timestamp of message
    },
};