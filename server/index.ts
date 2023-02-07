import * as express from 'express'
import pool from './database'

const app = express()
const port = 8000

const blog = require('./api/blog')
const items = require('./api/items')
const users = require('./api/users')

app.use(express.json())
app.use('/api', blog)
app.use('/api', items)
app.use('/api', users)

app.listen(port, () => {
    console.log(`Running server on http://localhost:${port}`)
})
