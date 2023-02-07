import pool from '../database'
import * as express from 'express'

const router = express.Router()

// POST blog
router
    .route('/blog')
    .post(async (req: any, res: any) => {
        try {
            const { title, content } = req.body
            const author = 1

            const time = await pool.query(`SELECT NOW()`)
            const created = time.rows[0].now

            console.log(created)

            const newBlog = await pool.query(
                `INSERT INTO blog (title, content, author, created) VALUES ($1, $2, $3, $4) RETURNING *`,
                [title, content, author, created]
            )

            res.json(newBlog.rows[0])
        } catch (err) {
            console.error(err)
        }
    })
    // DELETE
    .delete(async (req: any, res: any) => {
        try {
            const { blog_id } = req.params

            const deleteBlog = await pool.query(
                'DELETE FROM blog WHERE blog_id = $1',
                [blog_id]
            )

            res.json(`Blog ${blog_id} was deleted`)
        } catch (err) {
            console.error(err)
        }
    })

// UPDATE blog
router
    .route(`/blog/:blog_id`)
    .put(async (req: any, res: any) => {
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
    .get(async (req: any, res: any) => {
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
router.route('/blogs').get(async (req: any, res: any) => {
    try {
        const allBlogs = await pool.query(`SELECT * FROM blog`)

        res.json(allBlogs.rows)
    } catch (err) {
        console.error(err)
    }
})

module.exports = router
