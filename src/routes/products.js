const express = require('express');
const router = express.Router();
const pool = require('../database/db');

router.get('/', async (req, res) => {
    const products = await pool.query('SELECT p.id, p.name, p.price, p.idcat, p.stock, u.login FROM products p JOIN users u');
    console.log(products);
    res.render('products/index', { products });
});
router.get('/add', (req, res) => {
    res.render('products/add');
});
router.post('/add', async (req, res) => {
    console.log(req.body);
    const { name, price, category, stock } = req.body;
    const new_product = {
        name: name,
        price: price,
        idcat: category,
        stock: stock,
        users_id: 2
    }
    await pool.query('INSERT INTO products SET ?', [new_product]);
    res.redirect('/products');
});
router.get('/delete/:xid', async (req, res) => {
    const id = req.params.xid;
    await pool.query('DELETE FROM products WHERE id = ?', [id]);
    res.redirect('/products');
});
router.get('/edit/:xid', async (req, res) => {
    const id = req.params.xid;
    const product = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
    res.render('products/edit', {product: product[0]});
});
router.post('/edit/:xid', async (req, res) => {
    const id = req.params.xid;
    const {name, price, category, stock} = req.body;
    const edit_product = {
        name: name,
        price: price,
        idcat: category,
        stock: stock,
        users_id: 2
    }
    await pool.query('UPDATE products SET ? WHERE id = ? ', [edit_product, id]);
    res.redirect('/products');
});

module.exports = router;