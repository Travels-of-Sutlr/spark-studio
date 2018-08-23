
// Node Features.
const fs = require("fs");
const http = require("http");

module.exports = (client) => {

    client.wait = require("util").promisify(setTimeout);

};
