const moongse = require('mongoose');
const mongoURL = 'mongodb://127.0.0.1:27017/hotels';
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


