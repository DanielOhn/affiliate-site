import pool from '../database'
import * as express from 'express'

const router = express.Router()

router
    .route('/items/:items_id')
    // get item
    .get(async (req: any, res: any) => {
        try {
            const { item_id } = req.params

            const getItem = await pool.query(
                `SELECT * FROM items WHERE item_id = $1`,
                [item_id]
            )

            res.json(getItem.rows[0])
        } catch (err) {
            console.error(err)
        }
    })
    // update item
    .put(async (req: any, res: any) => {
        try {
            const { item_id } = req.params
            const { name, description, referral, images } = req.body

            const updateItem = await pool.query(
                `UPDATE items SET item_name = $1, item_desciption = $2, referral_link = $3, images = $4 WHERE item_id = $5`,
                [name, description, referral, images, item_id]
            )

            res.json('Item has been updated.')
        } catch (err) {
            console.error(err)
        }
    })
    // delete item
    .delete(async (req: any, res: any) => {
        try {
            const { item_id } = req.params
            const deleteItem = await pool.query(
                'DELETE FROM items WHERE item_id = $1',
                [item_id]
            )

            res.json('Item was deleted.')
        } catch (err) {
            console.error(err)
        }
    })

// get items
router
    .route('/items')
    .get(async (req: any, res: any) => {
        try {
            const getItems = await pool.query(`SELECT * FROM items`)

            res.json(getItems.rows)
        } catch (err) {
            console.error(err)
        }
    })
    // create item
    .post(async (req: any, res: any) => {
        try {
            const { name, description, referral, images } = req.body

            const newItem = await pool.query(
                `INSERT INTO items (item_name, item_desciption, referral_link, images) VALUES ($1, $2, $3, $4) RETURNING *`,
                [name, description, referral, images]
            )

            res.json(newItem.rows[0])
        } catch (err) {
            console.error(err)
        }
    })

module.exports = router
