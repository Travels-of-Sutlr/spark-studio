
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
                color: ping <= 50 ? 1044480 : ping <= 100 ? 61440 : ping <= 150 ? 15790080 : ping <= 500 ? 15728640 : 267386880,
                fields: [

                    {

                        name: "\u{1F3D3} Ping",
                        value: `${ping}ms`,
                        inline: true

                    },

                    {

                        name: "\u2764 Heartbeat",
                        value: `${this.client.pings[0]}ms`,
                        inline: true
                        
                    }

                ]

            }

        });

    }

}

module.exports = Ping;
