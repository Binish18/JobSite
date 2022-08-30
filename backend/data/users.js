import bcrypt from 'bcrypt'
// array of users admin bhi aata 
// data importing in db
const users = [
    {
      name: 'Admin User',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456', 10),// hash pw synchorouly  10 higher more secure
      isAdmin: true,
    },
    {
      name: 'Binish Waqar',
      email: 'Binish@example.com',
      password: bcrypt.hashSync('123456', 10),
 
    },
    {
      name: 'Sabeen Waqar',
      email: 'Sabeen@example.com',
      password: bcrypt.hashSync('123456', 10),
    },
  ]
  
  export default users