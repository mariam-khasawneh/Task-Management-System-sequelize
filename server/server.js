const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const userRoutes = require('./routs/UserRoutes');
const TaskRoutes = require('./routs/TaskRoutes');
const jwtAuth = require('./routs/jwtAuthRotes')



const PORT = 4000;

const app = express(); 
app.use(cors()); 
app.use(bodyParser.json());

app.use('/user' , userRoutes);
app.use('/task' , TaskRoutes);
app.use('/auth' , jwtAuth )





app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});