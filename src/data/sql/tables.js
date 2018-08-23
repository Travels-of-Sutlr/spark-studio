
module.exports = {

    guild_settings: {

        id: "CHAR (18)",
        prefix: "VARCHAR (5)",
        systemnotice: "BIT",
        modrole: "VARCHAR (100)",
        adminrole: "VARCHAR (100)",
        "PRIMARY KEY": "(id)"

    },

    user_data: {

        id: "CHAR (18)",
        bal: "INT",
        exp: "INT",
        rep: "INT",
        lastdaily: "TIMESTAMP",
        warns: "TEXT",
        kicks: "TEXT",
        bans: "TEXT",
        history: "TEXT",
        "PRIMARY KEY": "(id)"
        
    }

};
