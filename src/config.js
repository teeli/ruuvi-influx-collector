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

/**
 * RuuviTags are updated every 10 seconds. This frequency is way more than required for most use
 * cases, so we use a lower sampling rate to reduce the amount of data saved to InfluxDB.
 * @type {number}
 */
const samplingRate = process.env.SAMPLING_RATE || 0.05;

module.exports = {
    aliases,
    influx,
    samplingRate,
};
