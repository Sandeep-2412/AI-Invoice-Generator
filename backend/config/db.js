import mongoose from "mongoose";

export const connectDB = async() => {
    await mongoose.connect('mongodb+srv://sandeepmacha25_db_user:idEpK0REzj8KFs2H@cluster0.e0w9dzi.mongodb.net/InvoiceAI')
    .then(() => {console.log('DB CONNECTED')});
}