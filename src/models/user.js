"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const { mongoose } = require('../configs/dbConnection')
/* ------------------------------------------------------- */


// User Model

const passwordEncrypt = require('../helpers/passwordEncrypt')

//1.obje field
//2.obje field özellikleri
const UserSchema = new mongoose.Schema({

    username:{
        type:String,
        trim:true,
        required:true,
        unique:true,

    },
    password:{
        type:String,
        trim:true,
        required:true,
        unique:false,
        //? gelen her parola bilgisini şifreleyip kayıt yap
        set:(password) => passwordEncrypt(password)
    },
    email:{
        type:String,
        trim:true,
        //? email alanı zotunlu olsun hata durumunda mesaj göster
        required:[true,'Email field must be required'],
        //? email alanı unique olsun hata durumunda mesaj göster
        unique:[true,'Email field must be unique'],
        //? validate ile girilen bilginin email olup olmadığını kontrol et
        validate:[
            (email) => email.includes('@') && email.includes('.'),'Email type is incorrect'
        ]
    },
    isActive: {
        type: Boolean,
        default: true,
    },

    isAdmin: {
        type: Boolean,
        default: false,
    },

},{
    timestamps:true,
    //? collection ile field ismi belirleniyor
    collection:'users'
})

//? module export yapılırken Model ismi ve modele çevrilecek olan schema ismi belirleniyor
//? model ismi aynı zamanda kontroller tarafında kullanılacak
module.exports = mongoose.model('User',UserSchema)










