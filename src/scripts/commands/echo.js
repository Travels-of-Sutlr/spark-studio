
// Base Class
const Command = require("../base/Command.js");

class Echo extends Command {

    constructor(client) {

        super(client, {

            name: "echo",
            description: "Echoes the message as you!",
            category: "Fun",
            usage: "echo <message>"

        });

    }

    async run(msg, args, level) {

        const { TextChannel } = require("discord.js");

        if (!args.length)
            return await msg.channel.send("There's nothing to say...");

        let message = msg.cleanContent.slice(msg.settings.prefix.length + msg.invoked.length).trim();

        if (msg.channel instanceof TextChannel) {

            let wh = await msg.channel.createWebhook(msg.author.username, msg.author.displayAvatarURL);
            
            await wh.send(message);

            await wh.delete();

        }

        else {

            await msg.channel.send(message);

        }

        if (msg.deletable)
            await msg.delete();

    }

}

module.exports = Echo;
