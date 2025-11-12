require('dotenv').config()

const knexconfig = require('../knexfile')
const knex = require('knex')
const db = knex(knexconfig[process.env.DB_ENV])

module.exports = db
