
class Command {

    constructor({

        name = null,
        description = "No description provided.",
        category = "Miscellaneous",
        usage = "No usage provided.",
        enabled = true,
        guildOnly = false,
        aliases = new Array(),
        permLevel = "User"
        
    }) {

        this.help = { name, description, category, usage };
        this.conf = { enabled, guildOnly, aliases, permLevel };

    }

}

module.exports = Command;
