require('dotenv').config()

const ruuvi = require('node-ruuvitag');
const {InfluxDB, Point, HttpError} = require('@influxdata/influxdb-client')
const {isString, isNumber} = require('lodash');
const config = require('./config');

// init influxdb write api
const writeApi = new InfluxDB(config.influx.connection)
    .getWriteApi(
        config.influx.org,
        config.influx.bucket,
        'ns'
    );

ruuvi.on('found', tag => {
    tag.on('updated', data => {
        const point = new Point('ruuvi_measurement')
            .tag('id', tag.id)
            .tag('address', tag.address);

        if (config.aliases[tag.address]) {
            point.tag('alias', config.aliases[tag.address])
        }

        Object.entries(data).forEach(([key, value]) => {
            if (isNumber(value)) {
                point.floatField(key, value);
            } else {
                point.stringField(key, value);
            }
        })
        writeApi.writePoint(point);
        writeApi.flush();
    });
});

ruuvi.on('warning', message => {
    console.error(new Error(message));
});
