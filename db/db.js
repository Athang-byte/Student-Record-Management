import mongoose from "mongoose";
const connectDB= async (DATABASEURL)=>{
    try{
        const dbOption={
            dbName:'srm'
        }
        const response = await mongoose.connect(DATABASEURL,dbOption)
        if(response){
            console.log("Database Connected")
        }
        else{
            console.log("Database not connected")

        }

    }catch(error){
    console.log(error.message)
    }
}
export default connectDB;