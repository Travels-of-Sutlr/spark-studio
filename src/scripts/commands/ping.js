
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

    }

    async run(msg, args, level) {
        
        let ping = new Date() - msg.createdAt;
        await msg.channel.send({

            embed: { 

                // I don't know anything about pings... lel
                color: ping <= 100 ? 65280 : ping <= 200 ? 10878720 : ping <= 300 ? 986880 : ping <= 400 ? 16753920 : 16711680,
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
