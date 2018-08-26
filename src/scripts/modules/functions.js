
// Node Features.
const fs = require("fs");
const http = require("http");

module.exports = (client) => {

    client.wait = require("util").promisify(setTimeout);

    client.clean = async (client, text) => {

        if (text && text.constructor.name === "Promise")
            text = await text;

        if (typeof text !== "string")
            text = require("util").inspect(text, { depth: 0 });
        
        text = text.replace(/`/g, "` ")
            .replace(client.token, "<TOKEN>");
        
        return text;

    };

    Array.prototype.sum = function() {

        let sum = 0;
        for (var item of this) {

            sum += item;

        }

        return sum;

    };

};
