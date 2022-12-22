import * as express from 'express'
import pool from './database'

const app = express()
const port = 8000

app.use(express.json())

// GET posts
app.get('/posts', async (req: any, res: any) => {
    try {
        const allPosts = await pool.query('SELECT * FROM posts')
        res.json(allPosts.rows)
    } catch (err) {
        console.error(err)
    }
})

// CREATE posts
app.post('/posts', async (req: any, res: any) => {
    try {
        const { text } = req.body
        const newPost = await pool.query(
            'INSERT INTO posts (text) VALUES ($1) RETURNING *',
            [text]
        )

        res.json(newPost.rows[0])
    } catch (err) {
        console.error(err)
    }
})

// EDIT posts
app.put('/posts/:post_id', async (req: any, res: any) => {
    try {
        const { post_id } = req.params
        const { updateText } = req.body

        const updatePost = await pool.query(
            'UPDATE posts SET text = $1 WHERE post_id = $2',
            [updateText, post_id]
        )
        res.json('Post was updated.')
    } catch (err) {
        console.error(err)
    }
})

// DELETE posts
app.delete('/posts/:post_id', async (req: any, res: any) => {
    try {
        const { post_id } = req.params
        const deletePost = await pool.query(
            'DELETE FROM posts WHERE post_id = $1',
            [post_id]
        )

        res.json('Post was deleted.')
    } catch (err) {
        console.error(err)
    }
})

app.listen(port, () => {
    console.log(`Running server on http://localhost:${port}`)
})
