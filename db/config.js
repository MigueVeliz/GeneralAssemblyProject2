const pgp = require('pg-promise')({}),
config = process.env.DATABASE_URL || 'postgres://angelveliz@localhost:5432/crimes',
db = pgp(config);

module.exports = db;
