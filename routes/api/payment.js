var router = require("express").Router();
var { Payment } = require("../../models/payment");
var { Product } = require("../../models/product");
var { auth } = require("../../middelware/auth");
var { isuser } = require("../../middelware/isuser");
const { Types } = require('mongoose')

//create payment
router.post(
    "/create",
    auth,
    isuser,
    async (req, res) => {
        try {
            const payment = new Payment();
            const productId = req.body.productId
            const product = await Product.findById(productId)
            if (!product) {
                return res.status(400).json({ message: 'Product Not Found' })
            }
            payment.amount = product.price * req.body.quantity;
            payment.quantity = req.body.quantity;
            payment.description = req.body.description;
            payment.userId = req.user._id;
            payment.productId = productId;
            await payment.save();
            return res.json(payment);
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' })
        }
    }
);

//get all payments of user
router.get("/",
    auth,
    isuser,
    async (req, res) => {
        try {
            let payments = await Payment.find({
                userId: Types.ObjectId(req.user._id)
            });
            if (!payments) return res.json("no payments found");
            if (payments) {
                res.json({ payments });
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Internal Server Error' })
        }
    });


//find single payment by id
router.get("/:_id", async (req, res) => {
    let payment = await Payment.findById(req.params._id);
    if (!payment) return res.json("no payment found");
    if (payment) {
        res.json(payment);
    }
});



module.exports = router;
