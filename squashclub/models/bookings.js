
var mongoose = require("mongoose");


var bookingSchema = new mongoose.Schema({
    date: String(),
    time: String(),
    status: {type: Boolean, default:false},
    booker: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String(),
        firstName: String()
        }
    
});

module.exports = mongoose.model("Booking",bookingSchema);