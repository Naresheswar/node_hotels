const express= require('express')
const router =express.Router();
const Person= require('./../modules/person');

router.post('/',async (req,res)=>{
    try{
        const data=req.body;
        const newPerson = new Person(data);
        const response=await newPerson.save();
        console.log('data saved');
        res.status(200).json(response);
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



module.exports =router;