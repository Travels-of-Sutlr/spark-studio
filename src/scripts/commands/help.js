
// Base Class.
const Command = require("../base/Command.js");

class Help extends Command {

    constructor() {

        super({

            name: "help",
            description: "Displays the guide for the bot.",
            category: "Bot",
            usage: "help [command | category]",
            enabled: false

        });

    }

    async run(client, msg, args, level) {

        

    }

}

module.exports = Help;
