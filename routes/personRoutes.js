const express= require('express')
const router =express.Router();
const Person= require('./../modules/person');
const {jwtAuthMiddleware,generateToken} = require('./../jwt');

router.post('/signup',async (req,res)=>{
    try{
        const data=req.body;
        const newPerson = new Person(data);
        const response=await newPerson.save();
        console.log('data saved');

        const payload = {
            id:response.id,
            username:response.username,
        }
        const token =generateToken(payload);
        console.log("Token is: ",token);
        res.status(200).json({response:response,token:token});
    }catch(err){
        console.log(err);
        res.status(200).json(response);
    }
});

router.put('/:id',async (req,res)=>{
    try{
        const personId=req.params.id;
        const updatedPersonData = req.body;

        const response =await Person.findByIdAndUpdate(personId,updatedPersonData,{
            new: true,
            runValidators: true
        })
        if(!response){
            return res.status(404).json({message: 'Person not found'});
        }
        console.log('data updated');
        res.status(200).json(response);
        
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Internal server error'});
    }
});



// Login Route
router.post('/login', async (req, res) => {

    try {
        // Extract username and password from request body
        const { username, password } = req.body;

        // Find the user by username
        const user = await Person.findOne({ username: username });

        // If user does not exist or password does not match, return error
        if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Generate Token
        const payload = {
        id: user.id,
        username: user.username
        };

        const token = generateToken(payload);

        // Return token as response
        res.json({ token });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Profile route
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try {
        const userData = req.user;
        console.log("User Data: ", userData);

        const userId = userData.id;
        const user = await Person.findById(userId);

        res.status(200).json({ user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// GET method to get the person
router.get('/', jwtAuthMiddleware, async (req, res) => {
    try {
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




module.exports =router;