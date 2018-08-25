
// Base Class.
const Command = require("../base/Command.js");

class Ping extends Command {

    constructor(client) {

        super(client, {

            name: "ping",
            description: "Checks your ping.",
            category: "Fun",
            usage: "ping"

        });

    }

    async run(msg, args, level) {

        await msg.channel.send(`Pong! Journey took ${new Date() - msg.createdAt}ms`);

    }

}

module.exports = Ping;
