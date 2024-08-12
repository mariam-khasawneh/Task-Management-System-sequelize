const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const jwtcontroller = {
   

    async create(req, res) {
      
        const { firstName, lastName, email, password } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    },
    async createlogin(req, res) {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Check if the password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Generate JWT
        const token = jwt.sign(
            { id: user.id, email: user.email },
            'test', 
            { expiresIn: '1h' }
        );
// to send inf of user :
        const userInfo = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          };
          res.status(200).json({ message: 'Login successful', token, user: userInfo });


    },
   
    async view(req, res) {
  
        res.status(200).json({ message: 'You can see data :)' });
      
    }
};

module.exports = jwtcontroller;



