
// Base Class.
const Command = require("../base/Command.js");

const COLORS = {

    1: 65280,
    2: 10878720,
    3: 986880,
    4: 16753920,
    undefined: 16711680

};

function getColor(ping) {

    let temp = COLORS[ping];
    if (!temp)
        temp = COLORS[temp];
    
    return temp;

}

class Ping extends Command {

    constructor() {

        super({

            name: "ping",
            description: "Checks your ping.",
            category: "Bot",
            usage: "ping"

        });

    }

    async run(client, msg, args, level) {
        
        let ping = new Date() - msg.createdAt,
            color = getColor(Math.ceil(ping/100));


        await msg.channel.send({

            embed: { 

                // I don't know anything about pings... lel
                color,
                fields: [

                    {

                        name: "\u{1F3D3} Roundtrip",
                        value: `${ping}ms`,
                        inline: true

                    },

                    {

                        name: "\u2764 Heartbeat",
                        value: `${Math.ceil(client.ping)}ms`,
                        inline: true
                        
                    }

                ]

            }

        });

    }

}

module.exports = Ping;
