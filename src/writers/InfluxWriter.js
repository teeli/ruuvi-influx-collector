const ruuvi = require('node-ruuvitag');
const {InfluxDB, Point, HttpError} = require('@influxdata/influxdb-client')
const {isString, isNumber} = require('lodash');

/**
 * InfluxDB Writer
 */
class InfluxWriter {
    /**
     * @param config {Object} InfluxDB configuration
     */
    constructor(config) {
        this.writeApi = new InfluxDB(config.connection)
            .getWriteApi(
                config.org,
                config.bucket,
                'ns'
            );
    }

    /**
     * Write tag data to InfluxDB
     * @param tag {Object} ruuvi tag object
     * @param data {Object} data from ruuvi tag
     * @param options {Object} additional options
     */
    write(tag, data,options = {}) {
        const point = new Point('ruuvi_measurement')
            .tag('id', tag.id)
            .tag('address', tag.address);

        if (options.alias) {
            point.tag('alias', options.alias);
        }

        Object.entries(data).forEach(([key, value]) => {
            if (isNumber(value)) {
                point.floatField(key, value);
            } else {
                point.stringField(key, value);
            }
        })
        this.writeApi.writePoint(point);
        this.writeApi.flush();
    }
}

module.exports = InfluxWriter;