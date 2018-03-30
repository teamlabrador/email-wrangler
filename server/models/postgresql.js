const { Client } = require('pg');
const uri = 'postgres://oilleomz:8Y4riCwxL5g3VYrsQ0_yZZEvMKD94Dhq@baasu.db.elephantsql.com:5432/oilleomz'

const db = new Client({
  connectionString: uri,
});
db.connect();


module.exports = db;
