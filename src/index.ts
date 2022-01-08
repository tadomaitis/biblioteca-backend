import http from 'http'
import app from './app'
import { connect } from './helpers/mongo-helper'

void connect()

const PORT = process.env.port || 3000

const server = http.createServer(app)

server.listen(PORT, () => {
  console.log('Server is running on port', PORT)
})
