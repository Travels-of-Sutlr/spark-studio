
// NodeJS Modules.
const { promisify } = require("util");
const FS = require("fs");
const Path = require("path");
const readdir = promisify(FS.readdir);

// NodeJS Packages.
const Discord = require("discord.js");
const Klaw = require("klaw");
const { Pool } = require("pg");

class Spark extends Discord.Client {

    constructor(options) {

        super(options);

        this.config = require("./configs.js");
        this.commands = new Array();
        this.cooldowns = new Array();
        this.pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: true });

    }

    loadCommand(path) {

        console.log(`Loading command: ${Path.basename(path)}`);

        try {
            
            let info = Path.parse(path);

            let cmd = new (require(`${info.dir}${Path.sep}${info.base}`))(this);

            if (cmd.init)
                cmd.init(this);

            cmd.conf.location = info.dir;
            cmd.conf.base = info.base;

            this.commands.push(cmd);

            delete require.cache[require.resolve(`${info.dir}${Path.sep}${info.base}`)];

            return false;

        }

        catch (e) {

            return `\nUnable to load command due to:\n${e.stack}\n`;

        }

    }

    unloadCommand(cmdName) {
        
        let cmd = this.commands.find(c => c.help.name === cmdName || c.conf.aliases.includes(cmdName));

        if (!cmd);
            return `There's no command with the name/alias of ${cmdName}.`;

        this.commands.splice(this.commands.findIndex(c => Object.is(c, cmd)), 1);

        return false;

    }

    reloadCommand(cmdName) {

        let cmd = this.commands.find(c => c.help.name === cmdName || c.conf.aliases.includes(cmdName));

        if (!cmd);
            return `There's no command with the name/alias of ${cmdName}.`;

        this.commands.splice(this.commands.findIndex(c => Object.is(c, cmd)), 1);

        try {

            let info = [ cmd.conf.location,  cmd.conf.base ];

            cmd = new (require(`${info[0]}${Path.sep}${info[1]}`))(this);
            if (cmd.init)
                cmd.init(this);

            cmd.conf.location = info[0];
            cmd.conf.base = info.base[1];

            this.commands.push(cmd);

            delete require.cache[require.resolve(`${info.dir}${Path.sep}${info.base}`)];

            return false;

        }
        
        catch (e) {

            return `\nUnable to load command due to:\n${e.stack}\n`;

        }

    }

    async permLevel(msg) {

        let permLevels = this.config.permLevel.slice(1).sort((a, b) => a.level > b.level ? -1 : 1);
        let lvl = 0;

        for (var level of permLevels) {

            if (!msg.guild && level.guildOnly)
                continue;
            
            if (await level.test(msg)) {

                lvl = level.level;
                break;

            }

        }

        return lvl;

    }

    async getGuildSettings(id) {

        const client = await this.pool.connect();
        const defs = this.config.dGuildSettings;

        let settings = (await client.query(`SELECT ${Object.getOwnPropertyNames(defs).join(", ")} FROM guild_settings WHERE id = '${id}'`)).rows[0];
        if (!settings) {

            settings = {};
            console.log(`Unable to obtain guild settings with the ID: ${id}`);

        }
        
        let obj = {};
        for (var [ key, value ] of Object.entries(defs)) {

            obj[key] = settings[key] ? settings[key] : value;

        }

        await client.release(true);
        return obj;

    }

    async writeGuildSettings(id, data = {}) {

        const client = await this.pool.connect();
        const defs = this.config.dGuildSettings;

        let obj = {};

        for (var [ key, value ] of Object.entries(defs)) {

            if (data[key] && data[key] !== value) {

                obj[key] = data[key];

            }

            else {

                obj[key] = null;

            }

        }

        await client.query(`UPDATE guild_settings SET ${Object.entries(obj).reduce((acc, [ col, dat ], i) => acc + `${i !== 0 ? ", " : ""}${col} = ${typeof dat === "string" ? `'${dat}'` : dat}`, "")} WHERE id = '${id}'`);
        await client.release(true);

    }

    async getUserData(id) {

        const client = await this.pool.connect();
        const defs = this.config.dUserSettings;

        let userData = (await client.query(`SELECT * FROM user_data WHERE id = '${id}'`)).rows[0];
        if (!userData) {

            userData = {};
            console.log(`Unable to obtain user data of ID: ${id}`);

        }

        let obj = {};
        for (var [key, value] of Object.entries(defs)) {

            obj[key] = userData[key] ? userData[key] : value;

        }

        await client.release(true);
        return obj;

    }

    async writeUserData(id, data = {}) {

        const client = await this.pool.connect();
        const defs = this.config.dUserSettings;

        let obj = {};

        for (var [ key, value ] of Object.entries(defs)) {

            if (data[key] && data[key] !== value) {

                obj[key] = data[key];

            }

            else {

                obj[key] = null;

            }

        }

        await client.query(`UPDATE user_data SET ${Object.entries(obj).reduce((acc, [ col, dat ], i) => acc + `${i !== 0 ? ", " : ""}${col} = ${typeof dat === "string" ? `'${dat}'` : dat instanceof Array ? `{}` : dat}`, "")} WHERE id = '${id}'`);
        await client.release(true);

    }

}

const client = new Spark();
require("./scripts/modules/functions.js")(client);

var init = async () => {

    console.log("Initializing...\n");


    let cl = await client.pool.connect();

    try {

        const tableConfigs = require("./data/sql/tables.js");
        let tables = (await cl.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'")).rows.map(r => r.table_name);
        let columns = (await cl.query("SELECT column_name, table_name FROM information_schema.columns WHERE table_schema = 'public'")).rows;

        for (var [ table, value ] of Object.entries(tableConfigs)) {

            if (!tables.includes(table)) {

                let cols = Object.entries(value);
                await cl.query(`CREATE TABLE ${table} ( ${cols.reduce((acc, [ col, dat ], i) => acc + `${i !== 0 ? ", " : ''}${col} ${dat}`, "")} )`);
            
            }

            else {

                let configs = Object.entries(value);
                let cols = columns.filter(c => c.table_name === table).map(c => c.column_name);

                for (var [ col, dat ] of configs) {

                    if (!(/[A-Z ]+/g.test(col)) && !cols.includes(col.toLowerCase())) {

                        await cl.query(`ALTER TABLE ${table} ADD ${col} ${dat}`);

                    }

                }

            }

        }

    }
    
    catch (e) {

        throw e;

    }

    await cl.release(true);

    Klaw("./src/scripts/commands", { depthLimit: 0 }).on("data", (item) => {

        if (/.js$/gi.test(item.path)) {

            let response = client.loadCommand(item.path);
            if (response)
                console.log(response);

        }

    });

    let evtPaths = (await readdir("./src/scripts/events")).filter(p => /\.js$/g.test(p));
    for (var base of evtPaths) {
    
        let name = base.split(".")[0];
        console.log(`Loading event: ${name}`);

        let evt = new (require(`./scripts/events/${base}`))(client);
        client.on(name, (...args) => evt.run(...args));

        delete require.cache[require.resolve(`./scripts/events/${base}`)];

    }

    client.levelCache = {};
    for (var level of client.config.permLevel) {

        client.levelCache[level.name] = level.level;

    }

    await client.login(process.env.TOKEN);


    console.log("\nFinished initializing.");

};

init();

client.on("disconnect", () => console.warn("Client is disconnected."))
    .on("reconnecting", () => console.log("Client is reconnecting..."))
    .on("error", e => console.error(e))
    .on("warn", info => console.warn(info));
