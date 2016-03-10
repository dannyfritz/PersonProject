'use strict'
var path = require("path")

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({path: path.join(__dirname, '../../.env')});
}

var Knex = require('knex')
var format = require('util').format
var settings = require('../config/db')

var database = settings[process.argv[2]]
var client = Knex(database)

client.migrate.make(process.argv[3], {
  directory: database.migrations.directory,
}).then(function () {
  return client.destroy()
})
