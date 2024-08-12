const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');


// router.get('/' , (req , res) =>{
//     res.json('helloR')
// })

router.get('/' , UserController.index );
router.get('/:id', UserController.show);
router.post('/' , UserController.create);
router.put('/:id' , UserController.update);
router.patch('/:id' , UserController.delete);


module.exports = router;