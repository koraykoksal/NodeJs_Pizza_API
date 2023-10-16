"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */

const permission = require('../middlewares/permissions')
const order = require('../controllers/order')

//? URL : /orders

router.use(permission.isLogin)

router.route('/')
.get(order.list)
.post(order.create)


router.route('/:id')
.get(order.read)
.put(order.update)
.patch(order.update)
.delete(permission.isAdmin,order.delete) // delete işleminde permission bilgisi isAdmin olmalıdır





/* ------------------------------------------------------- */
module.exports = router


