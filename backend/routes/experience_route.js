
const express=require('express');
const router=express.Router();
const experience_model=require('../models/experience');
router.get('/experience',async(req,res)=>{
    res.json(await experience_model.find({}))
})
router.post('/experience_add',(req,res)=>{
    
    const newExperience=new experience_model({
        company_name:req.body.company_name,
        from:req.body.from,
        to:req.body.to,
        experience:req.body.experience,        
        place:req.body.place,        
        role:req.body.role,        
    })
    newExperience.save();
    res.json(newExperience)
})

module.exports=router;
