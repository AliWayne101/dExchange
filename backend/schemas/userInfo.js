const { Schema, model } = require('mongoose');
const userInfoSchema = new Schema({
    _id: Schema.Types.ObjectId,
    Email: String,
    AccountID: String,
    PKR: Schema.Types.Decimal128,
    USD: {
        type: Schema.Types.Decimal128
    },
    tStamp: {
        type: Date, default: Date.now
    },
    PaymentProcess: String,
    OriginalAmount: {
        type: Schema.Types.Decimal128
    },
    PayerInfo: [],
    Referral: String,
    OrderID: String,
    Status: String,
});

module.exports = model("UserInfo", userInfoSchema, "userinfo");