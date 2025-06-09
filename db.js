const moongse = require('mongoose');
require('dotenv').config();
const mongoURL = process.env.MONGO_URLDB;    //Local MongoDB connection
//const mongoURL = process.env.MONGO_URL;   // MongoDB Atlas connection string from .env file


moongse.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const db=moongse.connection;

db.on('connected',()=>{
    console.log('Database connected successfully');
});

db.on('error',(error)=>{
    console.error('Database connection error:', error);
});



db.on('disconnected',()=>{
    console.log('Database disconnected');
});

module.exports = db;