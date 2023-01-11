import pool from '../database'
import app from '../index'

// CREATE user
app.post(`/users`, async (req: any, res: any) => {
    try {
        const { username, email, password } = req.body
        // psedocode MAKE SURE TO UPDATE TO ACTUAL CODE
        const encryptedPassword = password.encrypt()

        const newUser = await pool.query(
            `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *`,
            [username, email, encryptedPassword]
        )

        res.json(newUser.rows[0])
    } catch (err) {
        console.error(err)
    }
})

// GET users
app.get(`/users`, async (req: any, res: any) => {
    try {
        const allUsers = await pool.query(`SELECT * FROM users`)
        res.json(allUsers.rows)
    } catch (err) {
        console.log(err)
    }
})

// GET user
app.get(`/users/:user_id`, async (req: any, res: any) => {
    try {
        const { user_id } = req.params

        const getUser = await pool.query(
            `SELECT * FROM users WHERE user_id = $1`,
            [user_id]
        )
        res.json(getUser.rows[0])
    } catch (err) {
        console.log(err)
    }
})

// UPDATE user
app.put(`/users/:user_id`, async (req: any, res: any) => {
    try {
        const { user_id } = req.params
        const { newEmail, newPassword } = req.body

        const updateUser = await pool.query(
            `UPDATE users SET newEmail = $1, newPassword = $2 WHERE user_id = $3`,
            [newEmail, newPassword, user_id]
        )

        res.json('Updated user')
    } catch (err) {
        console.error(err)
    }
})

// DELETE user
app.delete(`/users/:user_id`, async (req: any, res: any) => {
    try {
        const { user_id } = req.params
        const deleteUser = await pool.query(
            `DELETE FROM users WHERE user_id = $1`,
            [user_id]
        )

        res.json('User has been deleted.')
    } catch (err) {
        console.error(err)
    }
})
