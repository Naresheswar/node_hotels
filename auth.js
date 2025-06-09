const passport= require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person=require('./modules/person');


passport.use(new LocalStrategy(async(USERNAME,password,done)=>{
    try{
        //console.log('Recieved credentials:', USERNAME, password);
        const user =await Person.findOne({username: USERNAME});
        if(!user){
            return done(null,false,{message:'User not found'});
        }
        const isPasswordMatch = await user.comparePassword(password);
        if(!isPasswordMatch){
            return done(null,false,{message:'Incorrect password'});
        }
    }catch(err){
        return done(err);
    }
    
}))

module.exports =passport;