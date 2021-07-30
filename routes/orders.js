const express = require('express');
const router = express.Router();
const {database} = require('../config/helpers');


router.get('/', (req, res) => {
    database.table('orders_details as od')
        .join([
            {
                table: 'orders as o',
                on: 'o.id = od.order_id'
            },
            {
                table: 'products as p',
                on: 'p.id = od.product_id'
            },
            {
                table: 'users as u',
                on: 'u.id = o.user_id'
            }
        ])
        .withFields(['o.id', 'p.title', 'p.description', 'p.price', 'u.username'])
        .getAll()
        .then(orders => {
            if (orders.length > 0) {
                res.json(orders);
            } else {
                res.json({message: "No orders found"});
            }

        }).catch(err => res.json(err));
}); 

// Get Single Order
router.get('/:id', async (req, res) => {
    let orderId = req.params.id;
    console.log(orderId);

    database.table('orders_details as od')
        .join([
            {
                table: 'orders as o',
                on: 'o.id = od.order_id'
            },
            {
                table: 'products as p',
                on: 'p.id = od.product_id'
            },
            {
                table: 'users as u',
                on: 'u.id = o.user_id'
            }
        ])
        .withFields(['o.id', 'p.title', 'p.description', 'p.price', 'p.image', 'od.quantity as quantityOrdered'])
        .filter({'o.id': orderId})
        .getAll()
        .then(orders => {
            console.log(orders);
            if (orders.length > 0) {
                res.json(orders);
            } else {
                res.json({message: "No orders found"});
            }

        }).catch(err => res.json(err));
});
/* place new order*/

router.post('/new',(req,res) => {

    let {id, fname, lname, email, adress, country, phone, description, order_details, total_order, done} =req.body
    console.log(id, fname, lname, email, adress, country, phone, description, order_details, total_order);
    database.table('orderss').insert(
        {
            id: id,
            fname: fname,
            lname: lname,
            email: email,
            address: adress,
            country: country,
            phone: phone,
            description: description,
            order_details: order_details,
            total_order: total_order,
            done:'PENDING',
        }
    ).catch(err => res.json(err))


});
router.post('/payment', (req, res) => {
    setTimeout(() => {
        res.status(200).json({success: true});
    }, 3000)
});
module.exports = router;
