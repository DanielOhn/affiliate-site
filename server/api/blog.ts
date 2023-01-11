import pool from '../database'
import app from '../index'

// POST blog
app.post(`/blog`, async (req: any, res: any) => {
    try {
        const { title, content, author } = req.body

        const created = `POSTGRES GET DATE NOW()` // FIX THIS

        const newBlog = await pool.query(
            `INSERT INTO blog (title, content, author, created) VALUES ($1, $2, $3, $4) RETURNING *`,
            [title, content, author, created]
        )
    } catch (err) {
        console.error(err)
    }
})

// UPDATE blog
app.put(`/blog/:blog_id`, async (req: any, res: any) => {
    try {
        const { updateTitle, updateContent } = req.body
        const { blog_id } = req.params

        const updateBlog = await pool.query(
            `UPDATE blog SET title = $1, content = $2 WHERE blog_id = $3`,
            [updateTitle, updateContent, blog_id]
        )

        res.json(updateBlog.rows[0])
    } catch (err) {
        console.error(err)
    }
})

// GET blog
app.get(`/blog/:blog_id`, async (req: any, res: any) => {
    try {
        const { blog_id } = req.params

        const allBlogs = await pool.query(
            'SELECT * FROM blog WHERE blog_id = $1',
            [blog_id]
        )

        res.json(allBlogs.rows[0])
    } catch (err) {
        console.error(err)
    }
})

// GET blogs
app.get(`/blogs`, async (req: any, res: any) => {
    try {
        const allBlogs = await pool.query(`SELECT * FROM blog`)

        res.json(allBlogs.rows)
    } catch (err) {
        console.error(err)
    }
})

// DELETE
