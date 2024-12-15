const mongoose=require('mongoose')
require('dotenv').config()
const connectDB=async ()=>{
await mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.nho1n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
.then(()=>{
console.log('database connected')
})
.catch((err)=>{
    console.log('error is', err)
})
}
module.exports=connectDB;
