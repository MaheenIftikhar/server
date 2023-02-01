var mongoose = require("mongoose");

var paymentSchema = mongoose.Schema({
    name: String,
    amount: Number,
    quantity: Number,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    active: { type: Boolean, default: true },
}, {
    timestamps: true
});
var Payment = mongoose.model("Payment", paymentSchema);

module.exports.Payment = Payment;