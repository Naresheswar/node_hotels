const express=require('express');
const app=express();
const db=require('./db');
const bodyParser=require('body-parser');
app.use(bodyParser.json());
const MenuItem = require('./modules/Menu');
const passport = require('./auth');


require('dotenv').config();


app.use(passport.initialize());



const PORT = process.env.PORT || 3000;



const personRoutes= require('./routes/personRoutes');

const LocalAuthMiddleware = passport.authenticate('local',{session:false});
app.use('/person',personRoutes)


app.listen(PORT,()=>{
    console.log('Server is running on port 3000');
})