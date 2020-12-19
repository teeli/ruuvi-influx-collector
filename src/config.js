require('dotenv').config()

let aliases;
try {
    aliases = require('../aliases.json');
} catch (e) {
    console.warn('aliases.json missing or not valid JSON');
    aliases = {};
}

const influx = {
    connection: {
        url: process.env.INFLUX_URL || 'http://localhost:8086',
        token: process.env.INFLUX_TOKEN
    },
    org: process.env.INFLUX_ORG,
    bucket: process.env.INFLUX_BUCKET,
}

module.exports = {
    aliases,
    influx,
};