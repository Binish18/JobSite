import express from 'express';
import {getJobs,getJobById, deleteJob, createJob, updateJob, createJobReview} from '../controllers/jobController.js'
import { admin, protect } from '../middleware/authMiddleware.js';
const router=express.Router();


router.route('/').get(getJobs).post(protect,admin,createJob)
router.route('/:id').get(getJobById).delete(protect,admin,deleteJob).put(protect,admin,updateJob)

router.route('/:id/reviews').post(protect, createJobReview)

export default router