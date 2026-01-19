import mongoose from "mongoose";

export const connectDB = async() => {
    await mongoose.connect('your mongodb cluster uri')
    .then(() => {console.log('DB CONNECTED')});
}
