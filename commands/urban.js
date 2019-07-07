const fetch = require('node-fetch');
const querystring = require('querystring');
module.exports = {
    name: 'urban',
    description: 'fetch urban dictionary',
   async execute(msg, args){
        const query = querystring.stringify({ term: args.join(" ")});
        console.log(query)
        const {body} = await fetch(`https://api.urbandictionary.com/v0/define?${query}`).then(res => res.json());

        if(!body.list.length){
            return msg.channel.send(`No result found for **${args[1].join(" ")}**.`)
        }

        msg.channel.send(body.list[0].definition);
    }
}