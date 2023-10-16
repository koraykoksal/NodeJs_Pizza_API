"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// order Controller:

const Pizza = require('../models/pizza')
const order = require('../models/order')

module.exports = {

    list: async (req, res) => {
        /*
            #swagger.tags = ["orders"]
            #swagger.summary = "List orders"
            #swagger.description = `
                You can send query with endpoint for search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */

        const data = await res.getModelList(order)

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(order),
            data
        })
    },

    create: async (req, res) => {
        /*
            #swagger.tags = ["orders"]
            #swagger.summary = "Create order"
        */

        req.body.quantity = req.body?.quantity || 1

        //* create işlemi yaparken kontrol edilmesi gereken işlem
        if(!req.body.price){

            const pizzaFiyati = await Pizza.findOne({_id:req.body.pizzaId})

            req.body.price = pizzaFiyati.price
        }

        req.body.totalPrice = req.body.price * req.body.quantity

        const data = await order.create(req.body)

        res.status(201).send({
            error: false,
            data
        })
    },

    read: async (req, res) => {
        /*
            #swagger.tags = ["orders"]
            #swagger.summary = "Get Single order"
        */

        const data = await order.findOne({ _id: req.params.id })

        res.status(200).send({
            error: false,
            data
        })

    },

    update: async (req, res) => {
        /*
            #swagger.tags = ["orders"]
            #swagger.summary = "Update order"
        */

        req.body.quantity = req.body?.quantity || 1

        //* siparişi güncellemek istersek kontrol edilmesi geereken işlem
        if(!req.body.price){
    
            const orderFiyati = await order.findOne({_id:req.params.id})
    
            req.body.price = orderFiyati.price
        }
    
        req.body.totalPrice = req.body.price * req.body.quantity

        const data = await order.updateOne({ _id: req.params.id }, req.body)

        res.status(202).send({
            error: false,
            data,
            new: await order.findOne({ _id: req.params.id })
        })

    },

    delete: async (req, res) => {
        /*
            #swagger.tags = ["orders"]
            #swagger.summary = "Delete order"
        */

        const data = await order.deleteOne({ _id: req.params.id })

        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data
        })

    },
}