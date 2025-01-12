
const express=require('express');
const router=express.Router();
const fs=require("fs");
const Education_model=require('../models/education');

router.get('/education',async(req,res)=>{
    res.json(await Education_model.find({}))
})
router.get('/education/:id',async(req,res)=>{
    res.json(await Education_model.findById({_id:req.params.id}))
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

router.post('/education_edit',async(req,res)=>{
    let {id,grade,year,college,mark}=req.body;
    let data=await Education_model.findByIdAndUpdate({_id:id},{grade,year,college,mark})
    if (!data) {
        return res.status(404).json({ message: 'Unable to Update' });
    }
    res.status(200).json({ message: 'Updated successfully' });
})
router.delete('/education_delete/:id',async(req,res)=>{
   
    const deleteProject =await Education_model.findByIdAndDelete({_id:req.params.id});
    if (!deleteProject) {
        return res.status(404).json({ message: 'Unable to delete' });
    }
    res.status(200).json({ message: 'Deleted successfully'});
})
module.exports=router;
