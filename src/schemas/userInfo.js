const { Schema, model } = require('mongoose');
const userInfoSchema = new Schema({
    _id: Schema.Types.ObjectId,
    Email: String,
    AccountID: String,
    PKR: {
        type: Schema.Types.Decimal128
    },
    USD: {
        type: Schema.Types.Decimal128
    },
    tStamp: {
        type: Date, default: Date.now
    },
    PaymentProcess: String,
});

module.exports = model("UsersInfo", userInfoSchema, "usersinfo");