"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */

const permission = require('../middlewares/permissions')
const pizza = require('../controllers/pizza')

//? URL : /pizzas

router.route('/')
.get(pizza.list)
.post(permission.isAdmin,pizza.create)


router.route('/:id')
.get(pizza.read)
.put(permission.isAdmin,pizza.update)
.patch(permission.isAdmin,pizza.update)
.delete(permission.isAdmin,pizza.delete)


router.put('/:id/pushToppings', permission.isAdmin, pizza.pushToppings)
router.put('/:id/pullToppings', permission.isAdmin, pizza.pullToppings)


/* ------------------------------------------------------- */
module.exports = router


