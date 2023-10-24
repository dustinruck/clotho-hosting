/*
Order controller for non-admin
TODO: stripe
*/

const { Order } = require("../models");
const { User } = require("../models");
const { OrderItem } = require("../models");
const { Listing } = require("../models");


/* 
Get order by id
*/
exports.findById = async (req, res) => {

    try {

        var order = await Order.findOne(
            {
                where: {
                    id: req.params.id
                }
            },
            {
                include: [{
                    model: User,
                    as: 'Buyer',
                    attributes: [],
                    where: {
                        id: req.userId,
                        isDeleted: false
                    }
                },
                {
                    model: OrderItem,
                    attributes: [],
                    include: [{
                        model: Listing,
                        attributes: ['id', 'title', 'description', 'thumbnail', 'price'],
                    }]
                }]
            }
        );

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json(order);

    } catch (err) {

        console.log(err.message);
        res.status(500).json({ message: "Something went wrong" });
    }
};


/* 
Get buyer's private order list
*/
exports.findAllByBuyer = async (req, res) => {

    try {


        var orderList = await Order.findAll(
            {

                include: [{
                    model: User,
                    as: 'Buyer',
                    attributes: [],
                    where: {
                        id: req.userId,
                        isDeleted: false
                    }
                },
                {
                    model: OrderItem,
                    attributes: ['id'],
                    include: [{
                        model: Listing,
                        attributes: ['id', 'title', 'description', 'thumbnail', 'price'],
                    }]

                }]
            }
        );

        // if (!orderList[0]) {
        //     return res.status(404).json({ message: "No orders found" });
        // }

        res.json(orderList);

    } catch (err) {

        console.log(err.message);
        res.status(500).json({ message: "Something went wrong" });
    }
};

/* 
Create new order
*/
exports.create = async (req, res) => {

    try {

        var buyer = await User.findOne(
            {
                where: {
                    id: req.userId,
                    isDeleted: false
                }
            }
        );
        if (!buyer) {
            return res.status(400).json({ message: "Invalid user id" });
        }
        let err = 0;
        let total = 0;
        for (let id in req.body.items) {

            var listing = await Listing.findOne(
                {
                    where: {
                        id: req.body.items[id],
                        isSold: false,
                        isDeleted: false
                    }
                }
            );
            if (!listing) {
               err++;

            } else {
                total += listing.price;
            }
        }

        if (err > 0) {
            return res.status(400).json({ message: "One or more items are not available" });
        }

        // save order with buyer and total

        var order = await Order.create({
            buyerId: req.userId,
            total: total,
            paymentDetails: "placeholder"
        })

        // save order items and mark listings as sold

        for (let id in req.body.items) {

            var listing = await Listing.update(
                {
                    isSold: true
                },
                {
                    where: {
                        id: req.body.items[id]
                    }
                }
            );

            var orderItem = await OrderItem.create({
                orderId: order.id,
                listingId: req.body.items[id]
            })
        }

        res.status(201).json({ message: "Successfully placed order", order: order });


    } catch (err) {

        console.log(err.message);
        res.status(500).json({ message: "Something went wrong" });
    }

};


/* 
Delete order by id
*/
exports.cancelById = async (req, res) => {

    // request must include id
    if (!req.params.id) {
        return res.status(400).json({ message: "Order id cannot be null" });
    }
    try {

        // check that order with id exists
        var order = await Order.findOne(
            {
                where: {
                    id: req.params.id,
                    isCancelled: false,
                    buyerId: req.userId
                },
                include: [{
                        model: OrderItem
                }]
            });

        if (!order) {
            return res.status(400).json({ message: "Order does not exist or is already cancelled" });
        }

        for (let item in order.OrderItems) {

            await Listing.update(
                {
                    isSold: false
                },
                {
                    where: {
                        id: order.OrderItems[item].listingId
                    }
                }
            )
        }
        order = await Order.update(
            {
                isCancelled: true
            },
            {
                where: {
                    id: req.params.id
                }
            });


        res.status(200).json({ message: "Successful cancel" });

    } catch (err) {

        console.log(err.message);
        res.status(500).json({ message: "Something went wrong" });
    }
};