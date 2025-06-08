const express=require('express');
const app=express();
const db=require('./db');
const bodyParser=require('body-parser');
app.use(bodyParser.json());
const Person=require('./modules/person');
const MenuItem = require('./modules/Menu');

require('dotenv').config();

const PORT = process.env.PORT || 3000;

const personRoutes= require('./routes/personRoutes');

app.use('/person',personRoutes)


app.listen(PORT,()=>{
    console.log('Server is running on port 3000');
})