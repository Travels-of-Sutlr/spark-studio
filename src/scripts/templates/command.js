
// Base Class.
const Command = require("../base/Command.js");

class CommandName extends Command {

    constructor(client) {

        super(client, {

            name: "",
            description: "",
            category: "",
            usage: "",
            enabled: true,
            guildOnly: false,
            aliases: new Array(),
            permLevel: "User"

        });

    }

    async run(msg, args, level) {

        // Codes Goes Here.

    }

}

module.exports = CommandName;
