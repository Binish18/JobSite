import express from 'express'
import dotenv from 'dotenv'
import path from 'path' //file path

//import jobs from './data/jobs.js'
import  connectDB from './Config/db.js'
import jobRoutes from './routes/jobRoutes.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config()
connectDB()
// accept json data
const app = express();
app.use(express.json())  // accept json data
app.get('/',(req,res)=>{
    res.send("api is running")
})

app.use('/api/jobs',jobRoutes)
app.use('/api/users',userRoutes)

//app.get('/api/jobs',(req,res)=>{
  //  res.send(jobs)
//})
//app.get('/api/jobs/:id',(req,res)=>{
   // const job = jobs.find((j)=>j._id===req.params.id)
   // res.send(job)
//})

const PORT = process.env.PORT || 9000

app.listen(PORT,()=>{
    console.log(`server is running is ${PORT}`)
})
