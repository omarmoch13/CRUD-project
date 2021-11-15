const dotenv = require('dotenv')
const { Pool } = require('pg')

const databaseConfig = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "",
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
}) 

module.exports = databaseConfig;