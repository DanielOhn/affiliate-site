import pool from './database'

const passport = require('passport')
const LocalStrategy = require('passport-local')
const bcrypt = require('bcrypt')

passport.serializeUser((user: any, callback: any) => {
    process.nextTick(() => {
        return callback(null, {
            id: user.id,
            username: user.username,
            admin: user.admin,
        })
    })
})

passport.deserializeUser((user: any, callback: any) => {
    process.nextTick(() => {
        return callback(null, user)
    })
})

const customFields = {
    usernameField: 'username',
    passwordField: 'password',
}

const verifyCallback = async (username: any, password: any, done: any) => {
    console.log(username, password)

    // Find user in the database
    try {
        const user = await pool.query(
            `SELECT * FROM users WHERE username = $1`,
            [username]
        )

        if (!user || user.rows.length === 0) {
            return done(null, false)
        } else {
            const isValid = await bcrypt.compare(
                password,
                user.rows[0].password
            )

            if (isValid) {
                return done(null, user.rows[0])
            } else {
                return done(null, false)
            }
        }
    } catch (err: any) {
        done(err)
    }
}

const strategy = new LocalStrategy(customFields, verifyCallback)

passport.use(strategy)

passport.serializeUser((user: any, done: any) => {
    done(null, user.id)
})

passport.deserializeUser(async (userId: any, done: any) => {
    try {
        const user = await pool.query(
            `SELECT * FROM users WHERE user_id = $1`,
            [userId]
        )
        if (user) {
            done(null, user)
        }
    } catch (err: any) {
        done(err)
    }
})
