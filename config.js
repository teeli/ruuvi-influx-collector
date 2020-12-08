const aliases = {
    'd3:9b:a3:b0:6a:5b': 'Pakastin'
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