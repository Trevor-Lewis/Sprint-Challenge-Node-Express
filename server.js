const express = require('express')
const configureMiddleware = require('./middleware/configureMiddleware.js')
const projectRoutes = require('./dbRoutes/projectRoutes.js')
const actionRoutes = require('./dbRoutes/actionRoutes.js')

const server = express()

configureMiddleware(server)

server.use('/projects', projectRoutes)
server.use('/actions', actionRoutes)

module.exports = server;