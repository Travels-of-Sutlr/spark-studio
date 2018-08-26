
// Base Class.
const Command = require("../base/Command.js");

class Eval extends Command {

    constructor(client) {

        super(client, {

            name: "eval",
            description: "Evaluates JavaScript code.",
            category: "Bot--private",
            usage: "eval <query>",
            permLevel: "Bot Collaborator"
            
        });

    }

    async run(msg, args, level) {

        const client = this.client;
        const { Attachment } = require("discord.js");

        try {

            let evaled = eval(args.join(" "));
            evaled = await client.clean(evaled);

            let len = 3 + 2 + 1 + evaled.length + 1 + 3;
            if (len > 2000) {

                return await msg.channel.send({

                    embed: {

                        author: {
                            
                            name: "Limit reached"

                        },

                        color: client.config.embed.color.dec,

                        description: "```\nThe output reached the max numbers of characters. Sent the output as file.\n```"

                    },

                    files: [

                        new Attachment(Buffer.from(evaled, "utf-8"), "output.txt")

                    ]

                });

            }

            await msg.channel.send({
            
                embed: {

                    author: {

                        name: "Output"

                    },

                    color: client.config.embed.color.dec,

                    description: `\`\`\`xl\n${evaled}\n\`\`\``

                }

            });

        }

        catch (e) {

            await msg.channel.send({

                embed: {

                    author: {

                        name: "Output"

                    },

                    color: client.config.embed.color.dec,

                    description: `\`\`\`\n${e.stack}\n\`\`\``

                }

            });

        }

    }

}

module.exports = Eval;
