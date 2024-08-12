const express = require('express');
const router = express.Router();
const validInfo = require('../middleware/validinfo')
const UserController = require('../controllers/jwtcontroller');
const auth = require('../middleware/auth')
router.get('/' , (res,req)=>{
    req.json('hello');
})



//post 
router.post("/register"  ,  UserController.create );
router.post("/login"  ,  UserController.createlogin );
router.use(auth);

router.post('/view', auth, UserController.view);


module.exports = router;