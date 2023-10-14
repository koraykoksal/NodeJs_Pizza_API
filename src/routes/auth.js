"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */

const auth = require('../controllers/auth')


// URL : auth

router.route('/login')
.post(auth.login)

router.route('/refresh')
.post(auth.refresh)

//? swagger dokumantasyonunda loguth bilgisinin çıkması için burada get meodunu kullandık
router.route('/logout')
.get(auth.logout)


/* ------------------------------------------------------- */
module.exports = router