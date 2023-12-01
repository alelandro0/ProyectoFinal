require('dotenv').config();
const express= require('express');
const app= express();
const cors= require('cors');
const mongoose= require('mongoose');
const cookieparser= require ('cookie-parser');
const authRouter= require('./routers/authRouter')

app.use(cookieparser());
app.use(cors());
app.use(express.json());



//router
app.use('/api',authRouter)

const port= process.env.PORT || 3003;
const PORT= process.env.BD_CONNECTION_STRING;

async function main() {
    try {
        await mongoose.connect(process.env.BD_CONNECTION_STRING, {
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

main();

app.get('/', (req,res)=>{
    res.status(500).send('BIENVENIDO')
})
app.listen(port,()=>{
    console.log(`app is running on ${port}`);
})