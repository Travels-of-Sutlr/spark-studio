
module.exports = {

    embed: {
        
        color: {

            dec: 7723185,
            hex: "#75D8B1",
            rgb: [ 117, 216, 177 ]

        }

    },

    dGuildSettings: {

        prefix: ">",
        systemnotice: 1,
        adminrole: "Administrator",
        modrole: "Moderator"

    },

    dUserSettings: {

        bal: 0,
        exp: 0,
        rep: 0,
        lastdaily: null,
        lastrep: null,
        warns: new Array(),
        kicks: new Array(),
        bans: new Array(),
        history: new Array()

    },

    permLevel: [

        {

            name: "User",
            level: 0,
            guildOnly: false,
            test: () => true

        },

        {

            name: "Moderator",
            level: 2,
            guildOnly: true,
            test: (msg) => {

                let role = msg.guild.roles.find(r => r.name.toLowerCase() === msg.settings.modrole.toLowerCase());
                if (role && msg.member.roles.has(role.id))
                    return true;
                
                return false;
                
            }

        },

        {

            name: "Administrator",
            level: 3,
            guildOnly: true,
            test: (msg) => {

                let role = msg.guild.roles.find(r => r.name.toLowerCase() === msg.settings.adminrole.toLowerCase());
                if (role && msg.member.roles.has(role.id))
                    return true;
                
                return false;

            }

        },

        {

            name: "Server Owner",
            level: 4,
            guildOnly: true,
            test: (msg) => msg.guild.owner.id === msg.author.id

        },

        {

            name: "Bot Collaborator",
            level: 7,
            guildOnly: false,
            test: async (msg) => {

                const cl = await msg.client.pool.connect();

                try {
                    
                    let data = (await cl.query(`SELECT collabs FROM bot_settings WHERE id = '${msg.client.user.id}'`)).rows[0];
                    if (data && data.collabs.includes(msg.author.id))
                        return true;

                }

                catch (e) {

                    console.log(`Unable to obtain 'collabs' from bot_settings table:\n${e.stack}`);

                }

                await cl.release(true);
                return false;
            }

        },

        {

            name: "Bot Owner",
            level: 10,
            guildOnly: false,
            test: (msg) => msg.client.appInfo.owner.id === msg.author.id

        }

    ]

};
