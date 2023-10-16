"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
/*
    $ npm i express dotenv mongoose express-async-errors
    $ npm i jsonwebtoken morgan
*/
const express = require('express')
const app = express()

/* ------------------------------------------------------- */
// Required Modules:

// envVariables to process.env:
require('dotenv').config()
const PORT = process.env?.PORT || 8000

// asyncErrors to errorHandler:
require('express-async-errors')

/* ------------------------------------------------------- */
// Configrations:



// Connect to DB:
const { dbConnection } = require('./src/configs/dbConnection')
dbConnection()

/* ------------------------------------------------------- */
// Middlewares:



// Accept JSON
app.use(express.json())


//? headers dan gelen autoization bilgilerinin kontrol edildiği yer
// Access Token Control
app.use(require('./src/middlewares/authentication'))

// const jwt = require('jsonwebtoken')

// app.use((req,res,next)=>{

//     const auth = req.headers?.authorization
//     // bearer kelimesinden kurtulmak için split(' ') yapıp boşluk bırakılır ve birinci indexdeki değer alırnı
//     const accessToken = auth ? auth.split(' ')[0] : null

//     req.isLogin = false
//     req.user = null
//     jwt.verify(accessToken,process.env.ACCESS_KEY,function(err,userData){

//         if(userData){
//             req.isLogin=true
//             req.user = userData
//         }
//     })

//     next()
// })



// Run Logger:
app.use(require('./src/middlewares/logger'))

// URL SEARCHING
app.use(require("./src/middlewares/findSearchSortPage"))


/* ------------------------------------------------------- */
// Routes:

// HomePath:
app.all('/', (req, res) => {
    res.send({
        error: false,
        message: 'Welcome to PIZZA API',
        isLogin: req.isLogin,
        user: req.user
    })
})

// AUTH
app.use('auth',require('./src/routes/auth'))

// USER :
app.use('/users',require('./src/routes/user'))

// TOPPİNG
app.use('/topping',require('./src/routes/topping'))


// PIZZA
app.use('/pizza',require('./src/routes/pizza'))


// ORDER
app.use('/order',require('./src/routes/order'))








/* ------------------------------------------------------- */

// errorHandler:
app.use(require('./src/middlewares/errorHandler'))

// RUN SERVER:
app.listen(PORT, () => console.log('http://127.0.0.1:' + PORT))

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require('./src/helpers/sync')()