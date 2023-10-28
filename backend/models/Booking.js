import { Schema,model } from "mongoose";

const bookingSchema = new Schema({
    userId : {
        type :String
    },
    tourName : {
        type : String,
        required :true
    },
    tourId : {
        type : String,
        required : true,
    },
    userEmail : {
        type : String
    },
    fullName : {
        type : String,
        required : true
    },
    guestsSize : {
        type : Number,
        required : true
    },
    phone : {
        type : Number,
        required : true
    },
    bookAt : {
        type : Date,
        required : true
    },
    totalCost : {
        type : Number,
        required : true
    }
},{timestamps : true})

export default model("Bookings",bookingSchema);