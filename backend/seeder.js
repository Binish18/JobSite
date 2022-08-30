import mongoose from 'mongoose'
import dotenv from 'dotenv'
import users from './data/users.js'
import jobs from './data/jobs.js'
import User from './Models/UserModel.js'
import Job from './Models/JobModel.js'
import connectDB from './Config/db.js'

dotenv.config()
connectDB()
const importData = async () => {
    try {
     
      await Job.deleteMany()
      await User.deleteMany()
  
      const createdUsers = await User.insertMany(users)
  
      const adminUser = createdUsers[0]._id // created users ajAYEINGEIN
       
      const sampleJobs = jobs.map((job) => {
        return { ...job, user: adminUser }
      })
  
      await Job.insertMany(sampleJobs)
  
      console.log('Data Imported!')
      process.exit()
    } catch (error) {
      console.error(`${error}`)
      process.exit(1)
    }
  }
  
  const destroyData = async () => {
    try {
    
      await Job.deleteMany()
      await User.deleteMany()
  
      console.log('Data Destroyed!')
      process.exit()
    } catch (error) {
      console.error(`${error}`)
      process.exit(1)
    }
  }
  
  if (process.argv[2] === '-d') {
    destroyData()
  } else {
    importData()
  }
