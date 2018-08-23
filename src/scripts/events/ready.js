
module.exports = class {

    constructor(client) {

        this.client = client;

    }

    async run() {

        await this.client.wait(1000);

        this.client.appInfo = await this.client.fetchApplication();
        setInterval(async () => {
            
            this.client.appInfo = await this.client.fetchApplication();

        }, 60000);

        this.client.user.setPresence({

            status: "dnd",
            game: {

                name: `with ${this.client.users.size} users | ${this.client.config.dGuildSettings.prefix}help`,
                type: 0

            }

        });

        console.log(`Client ready to serve ${this.client.users.size} users.`);

    }

};
