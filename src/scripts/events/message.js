
module.exports = class {

    constructor(client) {

        this.client = client;

    }

    async run(msg) {

        if (msg.author.bot)
            return;

        if (msg.guild && !msg.guild.me.permissionsIn(msg.channel).has("SEND_MESSAGES", true))
            return;

        let settings = await this.client.getGuildSettings(msg.guild ? msg.guild.id : msg.author.id);
        msg.settings = settings;

        if (!msg.content.startsWith(settings.prefix))
            return;

        let args = msg.content.slice(settings.prefix.length).trim().split(/ +/g);
        let invoked = args.shift().toLowerCase();

        const lvl = await this.client.permLevel(msg);
        const cmd = this.client.commands.find(c => c.help.name === invoked || c.conf.aliases.includes(invoked));

        if (!cmd)
            return;

        if (!cmd.conf.enabled)
            return await msg.channel.send("This command is currently disabled. Please try again later!");

        if (!msg.guild && cmd.conf.guildOnly)
            return await msg.channel.send("This command is not available via direct message. Please run the command in a server.");

        if (lvl < this.client.levelCache[cmd.conf.permLevel]) {

            if (settings.systemnotice)
                await msg.channel.send(`You don't have the permission to use this command. Your permission level is ${this.client.config.permLevel.find(l => l.level === level).name} (${level}) while the command requires the level ${cmd.conf.permLevel} (${this.client.levelCache[cmd.conf.permLevel]})`);
            
            return;

        }

        msg.author.permLevel = lvl;
        msg.invoked = invoked;

        msg.flags = [];
        while (args.length && args.find(s => /^--/g.test(s))) {

            msg.flags.push(args.splice(args.findIndex(s => /^--/g.test(s)), 1)[0]);

        }

        try {

            await cmd.run(msg, args, lvl);

        }

        catch (e) {

            await msg.channel.send(`A problem has occurred in the bot. Please contact the developers.\n\`\`\`${e.type ? e.type : e.name}: ${e.message}\`\`\``);
            console.error("\n" + e.stack + "\n");

        }

    }

};
