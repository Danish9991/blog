import mongoose from "mongoose";

const connectDB = async(req, res) => {
    try {  
        const db = await mongoose.connect(process.env.MONGO_URI)
        console.log('mongodb connected succesfully')
    } catch (error) {
        console.log('error while connecting mongodb')
        console.log(error);
    }
}
export default connectDB