# RuuviTag InfluxDB collector

Get measurements from RuuviTag(s) and save them to InfluxDB 2.0.

## Get started

1) Clone this repository
2) Run `npm install`
3) Copy `.env.example` as `.env` and add your InfluxDB details.
4) Start collecting by running `npm start`

### Aliases

Optionally you can define aliases for your RuuviTags. This will add a tag called `alies` to all data points in InfluxDB
that you can also use in your queries. Start by copying `aliases.json.example` as `aliases.json`. Define aliases for 
your RuuviTag(s) as key-pair values where key is your tag's address and value is the alias.

#### Example
```json
{
  "ab:cd:ef:12:34:56": "My RuuviTag",
  "ab:cd:ef:12:34:89": "Another RuuviTag"
}
```
