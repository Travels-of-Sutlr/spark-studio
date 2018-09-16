
// Base Class.
const Command = require("../base/Command.js");

class Daily extends Command {

    constructor(client) {

        super(client, {

            name: "daily",
            description: "Obtain your daily reward.",
            category: "User",
            usage: "daily",
            enabled: false

        });

    }

    async run(msg, args, level) {

        let userData = await client.getUserData(msg.author.id);
        if (userData.lastdaily) {

            let last = process.hrtime(userData.lastdaily);

        }

    }

}

module.exports = Daily;
