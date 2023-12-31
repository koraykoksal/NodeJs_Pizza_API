"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// pizza Controller:

const pizza = require('../models/pizza')

module.exports = {

    list: async (req, res) => {
        /*
            #swagger.tags = ["pizzas"]
            #swagger.summary = "List pizzas"
            #swagger.description = `
                You can send query with endpoint for search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */

        const data = await res.getModelList(pizza)

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(pizza),
            data
        })
    },

    create: async (req, res) => {
        /*
            #swagger.tags = ["pizzas"]
            #swagger.summary = "Create pizza"
        */

        const data = await pizza.create(req.body)

        res.status(201).send({
            error: false,
            data
        })
    },

    read: async (req, res) => {
        /*
            #swagger.tags = ["pizzas"]
            #swagger.summary = "Get Single pizza"
        */

        const data = await pizza.findOne({ _id: req.params.id })

        res.status(200).send({
            error: false,
            data
        })

    },

    update: async (req, res) => {
        /*
            #swagger.tags = ["pizzas"]
            #swagger.summary = "Update pizza"
        */

        const data = await pizza.updateOne({ _id: req.params.id }, req.body)

        res.status(202).send({
            error: false,
            data,
            new: await pizza.findOne({ _id: req.params.id })
        })

    },

    delete: async (req, res) => {
        /*
            #swagger.tags = ["pizzas"]
            #swagger.summary = "Delete pizza"
        */

        const data = await pizza.deleteOne({ _id: req.params.id })

        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data
        })

    },

    // Add toppings to Pizza.toppings:
    pushToppings: async (req, res) => {
        /*
            #swagger.tags = ["pizzas"]
            #swagger.summary = "Add Toppings to pizza"
        */

        const toppings = req.body?.toppings

        const data = await pizza.updateOne({ _id: req.params.id }, {$push:{toppings:toppings}})
        
        const newData = await pizza.findOne({ _id: req.params.id })

        res.status(202).send({
            error: false,
            data,
            toppingsCount:newData.toppings.length,
            new: newData
        })

    },

    // Remove toppings from Pizza.toppings:
    pullToppings: async (req, res) => {
        /*
            #swagger.tags = ["Pizzas"]
            #swagger.summary = "Remove Toppings from Pizza"
        */

        const toppings = req.body?.toppings // ObjectId

        // const data = await Pizza.findOne({ _id: req.params.id })
        // data.toppings.pull(toppings)
        // await data.save()
        const data = await pizza.updateOne({ _id: req.params.id }, { $pull: { toppings: toppings } })
        const newData = await pizza.findOne({ _id: req.params.id }).populate('toppings')

        res.status(202).send({
            error: false,
            data,
            toppingsCount: newData.toppings.length,
            new: newData
        })
    },
}