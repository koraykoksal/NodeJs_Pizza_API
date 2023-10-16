"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */

const permission = require('../middlewares/permissions')
const topping = require('../controllers/topping')

//? URL : /toppings

//* router.use tüm route işlemlerinde çalışacak olan middlewaredır. tüm router talepleri için isAdmin bilgisi olacaktır.
router.use(permission.isAdmin)

router.route('/')
.get(topping.list)
.post(topping.create)


router.route('/:id')
.get(topping.read)
.put(topping.update)
.patch(topping.update)
.delete(topping.delete)





/* ------------------------------------------------------- */
module.exports = router


