import Job from '../Models/JobModel.js'
import asyncHandler from 'express-async-handler';

 // @desc Fetch all jobs
 // @routes GET api/jobs
 // @acess public // koi bhi acess karsakta
const getJobs = asyncHandler(async (req, res) => {
   const keyword = req.query.keyword ? {  // it it exsits
    name:{
      $regex : req.query.keyword,
      $options: 'i',
    }
   } : {}
    const jobs= await Job.find({...keyword})
    res.send(jobs)
})

 // @desc Fetch single job
 // @routes GET api/jobs/:id
 // @acess public 
const getJobById = asyncHandler(async (req, res) => {
    const job = await Job.findById(req.params.id)
     if(job)
     {
        res.send(job)
     }
     else{
        res.status(404).json({message:'job not found'})
     }
})

 // @desc    Delete a job
// @route   DELETE /api/jobs/:id
// @access  Private/Admin
const deleteJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id) //find job
// any admin cando it 
  if (job) {
    await job.remove()
    res.json({ message: 'Job removed' })
  } else {
    res.status(404)
    throw new Error('Job not found')
  }
})
// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createJob = asyncHandler(async (req, res) => {
const job = new Job({
  name: 'Sample name',
  Pay: 0,
  user: req.user._id,
  image: '/images/sample.jpg',
  location: 'Sample location',
  numReviews: 0,
  description: 'Sample description',
})

const createdJob = await job.save()
res.status(201).json(createdJob)
})

// @desc    Update a job
// @route   PUT /api/jobs/:id
// @access  Private/Admin
const updateJob = asyncHandler(async (req, res) => {
const {
  name,
  Pay,
  description,
  image,
  location,

} = req.body

const job = await Job.findById(req.params.id)

if (job) {
  job.name = name
  job.Pay = Pay
  job.description = description
  job.image = image
  job.location = location

  const updatedJob = await job.save()
  res.json(updatedJob)
} else {
  res.status(404)
  throw new Error(' Job not found')
}
})

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createJobReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const job = await Job.findById(req.params.id)

  if (job) {
    const alreadyReviewed = job.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error(' already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    job.reviews.push(review)

    job.numReviews = job.reviews.length

    job.rating =
      job.reviews.reduce((acc, item) => item.rating + acc, 0) /
      job.reviews.length

    await job.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Job not found')
  }
})

export {
    getJobById,
    getJobs,
    deleteJob,
    updateJob,createJob,createJobReview
}