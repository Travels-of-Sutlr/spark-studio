
class Command {

    constructor(client, {

        name = null,
        description = "No description provided.",
        category = "Miscellaneous",
        usage = "No usage provided.",
        enabled = true,
        guildOnly = false,
        aliases = new Array(),
        permLevel = "User"
        
    }) {

        this.client = client;
        this.help = { name, description, category, usage };
        this.conf = { enabled, guildOnly, aliases, permLevel };

    }

}

module.exports = Command;
