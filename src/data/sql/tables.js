
module.exports = {

    guild_settings: {

        id: "CHAR (18)",
        prefix: "VARCHAR (5)",
        systemnotice: "BIT",
        modrole: "VARCHAR (100)",
        adminrole: "VARCHAR (100)",
        spamchannels: "CHAR (18)",
        "PRIMARY KEY": "(id)"

    },

    user_data: {

        id: "CHAR (18)",
        bal: "INT",
        exp: "INT",
        rep: "INT",
        lastdaily: "INT[]",
        lastrep: "INT[]",
        warns: "TEXT",
        kicks: "TEXT",
        bans: "TEXT",
        history: "TEXT",
        "PRIMARY KEY": "(id)"
        
    },

    bot_settings: {

        id: "CHAR (18)",
        collabs: "CHAR (18)[]",
        "PRIMARY KEY": "(id)"

    }

};
