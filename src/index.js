const ruuvi = require('node-ruuvitag');
const { InfluxDB, Point, HttpError } = require('@influxdata/influxdb-client')
const { isString, isNumber } = require('lodash');
const config = require('./config');
const InfluxWriter = require('./writers/InfluxWriter');

console.log('Running RuuviTag InfluxDB Collector');

const writer = new InfluxWriter(config.influx);

/**
 * Write data to writer when receiving data from Ruuvi
 */
ruuvi.on('found', (tag) => {
    let sample;
    const options = {};

    // set tag alias in options if defined in config
    if (config.aliases[tag.address]) {
        options.alias = config.aliases[tag.address];
    }

    tag.on('updated', (data) => {
        // write sample to database in first sample and when sampling rate treshold is passed
        if (typeof sample === 'undefined' || (++sample * config.samplingRate) >= 1) {
            // reset sample count
            sample = 0;
            writer.write(tag, data, options);
        }
    });
});

ruuvi.on('warning', (message) => {
    console.error(new Error(`Ruuvi error: ${message}`));
});
