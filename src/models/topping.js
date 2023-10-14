"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const { mongoose } = require('../configs/dbConnection')
/* ------------------------------------------------------- */

// Topping model

//1.obje field
//2.obje field özellikleri
const ToppingSchema = new mongoose.Schema({

    name:{
        type:String,
        trim:true,
        required:true,
        unique:true,

    },

},{
    timestamps:true,
    //? collection ile field ismi belirleniyor
    collection:'toppings'
})

//? module export yapılırken Model ismi ve modele çevrilecek olan schema ismi belirleniyor
//? model ismi aynı zamanda kontroller tarafında kullanılacak
module.exports = mongoose.model('Topping',ToppingSchema)










