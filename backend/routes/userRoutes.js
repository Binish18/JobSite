import { authUser,deleteUser,getUserById,getUserProfile, getUsers, registerUser, updateUser, updateUserProfile } from '../controllers/userController.js'
const router=express.Router();
import express from 'express';
import { admin, protect } from '../middleware/authMiddleware.js';

router.route('/').post(registerUser).get(protect,admin,getUsers)
router.post('/login',authUser)
router.route('/profile').get( protect,getUserProfile).put(protect,updateUserProfile)
router.route('/:id').delete(protect,admin,deleteUser).get(protect,admin,getUserById).put(protect,admin,updateUser)
export default router