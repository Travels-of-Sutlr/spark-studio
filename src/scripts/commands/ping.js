
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
        
        let ping = new Date() - msg.createdAt;

        await msg.channel.send({

            embed: { 

                // I don't know anything about pings... lel
                color: ping <= 100 ? 65280 : ping <= 200 ? 1048320 : ping <= 300 ? 986880 : ping <= 400 ? 16715520 : 16711680,
                fields: [

                    {

                        name: "\u{1F3D3} Ping",
                        value: `${ping}ms`,
                        inline: true

                    },

                    {

                        name: "\u2764 Heartbeat",
                        value: `${Math.ceil(this.client.ping)}ms`,
                        inline: true
                        
                    }

                ]

            }

        });

    }

}

module.exports = Ping;
