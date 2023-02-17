import { Pool } from 'pg'
require('dotenv').config()

const devConfig = {
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT),
    database: process.env.PG_DATABASE,
}

const pgPool = new Pool(devConfig)

export default pgPool
