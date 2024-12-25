
const express=require('express');
const router=express.Router();
const Education_model=require('../models/education');
router.get('/education',async(req,res)=>{
    res.json(await Education_model.find({}))
})
router.post('/education_add',(req,res)=>{
    
    const newEducation=new Education_model({
        grade:req.body.grade,
        year:req.body.year,
        mark:req.body.mark,
        college:req.body.college,        
    })
    newEducation.save();
    res.json(newEducation)
})

module.exports=router;
