import * as express from 'express'
import pool from './database'

const app = express()
const port = 8000

const blog = require('./api/blog')

app.use(express.json())
app.use('/api', blog)

app.listen(port, () => {
    console.log(`Running server on http://localhost:${port}`)
})
