import User from '../Models/UserModel.js'
import asyncHandler from 'express-async-handler';
import  generateToken  from '../utils/generateToken.js'
 // @desc Auth user & gettoken
 // @routes POST api/users/login
 // @acess public // koi bhi acess karsakta
const authUser = asyncHandler(async (req, res) => {
     // get data from body
     const {email,password} = req.body
     const user = await User.findOne({ email })

     if (user && (await user.matchPassword(password))) { 
       res.json({
         _id: user._id,
         name: user.name,
         email: user.email,
         isAdmin: user.isAdmin,
         token:generateToken(user._id)
       })
     } else {
       res.status(401)
       throw new Error('Invalid email or password')
     }
})


// @desc register a user 
 // @routes POST api/users/
 // @acess public // koi bhi acess karsakta
 const registerUser = asyncHandler(async (req, res) => {
  // get data from body
  const { name,email,password} = req.body
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }
  const user = await User.create({
    name,
    email,
    password,
  })
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

 // @desc GET user profile
 // @routes GET  api/users/profile
 // @acess private
const getUserProfile = asyncHandler(async (req, res) => {
  // get data from body
  const user = await User.findById(req.user._id)
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc update user profile
 // @routes PUT  api/users/profile
 // @acess private
 const updateUserProfile = asyncHandler(async (req, res) => {
  // get data from body
  const user = await User.findById(req.user._id)
  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc GET  all users
 // @routes GET  api/users
 // @acess private/Admin
 const getUsers = asyncHandler(async (req, res) => {
  // get data from body
  const users = await User.find({})// all users
  res.json(users)
 
})

// @desc delete one user
 // @routes DELETE api/users/:id
 // @acess private/Admin
 const deleteUser = asyncHandler(async (req, res) => {
  // get data from body
  const user = await User.findById(req.params.id)
  if(user){
    await user.remove()
    res.json({message:'user removed'})
  }else{
    res.status(404)
    throw new error('user not found');
  }
 
})

 // @desc    get  users by id
// @route   GET/api/users/:id
// @access  private/Admin
// returns just user data 
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')
  //user back
  
  
  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin || user.isAdmin

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})



export {authUser,getUserProfile,registerUser,updateUserProfile,getUsers,deleteUser,getUserById,updateUser}