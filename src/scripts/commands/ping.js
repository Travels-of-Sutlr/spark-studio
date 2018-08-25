
// Base Class.
const Command = require("../base/Command.js");

class Ping extends Command {

    constructor(client) {

        super(client, {

            name: "ping",
            description: "Checks your ping.",
            category: "Bot",
            usage: "ping"

        });

        this.COLORS = {

            1: 65280,
            2: 10878720,
            3: 986880,
            4: 16753920,
            5: 16711680
        };

    }

    async run(msg, args, level) {
        
        let ping = Math.ceil((new Date() - msg.createdAt) / 100), color = 0;

        if (ping < 5)
            color = this.COLORS[ping];
        
        else
            color = this.COLORS[ping];


        await msg.channel.send({

            embed: { 

                // I don't know anything about pings... lel
                color,
                fields: [

                    {

                        name: "\u{1F3D3} Roundtrip",
                        value: `${ping}ms`,
                        inline: true

                    } /* ,

                    {

                        // Don't mind... client.ping broke on meh
                        name: "\u2764 Heartbeat",
                        value: `${Math.ceil(this.client.ping)}ms`,
                        inline: true
                        
                    } */

                ]

            }

        });

    }

}

module.exports = Ping;
