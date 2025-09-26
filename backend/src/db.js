import mongoose from 'mongoose'

export const connectDB = async()=> {
    try{
        await mongoose.connect("mongodb+srv://Karla:123456789a@cluster0.wkrskvc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        console.log("DB connected")
    }catch(error){
        console.log(error)
    }
}