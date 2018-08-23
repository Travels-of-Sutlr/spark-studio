
// Base Class
const Command = require("../base/Command.js");

class Echo extends Command {

    constructor(client) {

        super(client, {

            name: "echo",
            description: "Makes the bot says something you want to it to say.",
            category: "Fun",
            usage: "echo <message>"

        });

    }

    async run(msg, args, level) {

        if (!args.length)
            return await msg.channel.send("There's nothing to say...");

        let wh = await msg.channel.createWebhook(msg.author.username, msg.author.displayAvatarURL);
        
        await wh.send(msg.cleanContent.slice(msg.settings.prefix.length + msg.invoked.length).trim());

        await wh.delete();
        
        if (msg.deletable)
            await msg.delete();

    }

}

module.exports = Echo;
