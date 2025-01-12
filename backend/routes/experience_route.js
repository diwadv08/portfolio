
const express=require('express');
const router=express.Router();
const fs=require("fs");
const experience_model=require('../models/experience');
router.get('/experience',async(req,res)=>{
    res.json(await experience_model.find({}))
})
router.get('/experience/:id',async(req,res)=>{
    res.json(await experience_model.findById({_id:req.params.id}))
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
router.post('/experience_edit',async(req,res)=>{
    let {id,company_name,from,to,experience,place,role}=req.body;
    let data=await experience_model.findByIdAndUpdate({_id:id},{company_name,from,to,experience,place,role})
    if (!data) {
        return res.status(404).json({ message: 'Unable to Update' });
    }
    res.status(200).json({ message: 'Updated successfully' });
})
router.delete('/experience_delete/:id',async(req,res)=>{
    const deleteProject =await experience_model.findByIdAndDelete({_id:req.params.id});
    if (!deleteProject) {
        return res.status(404).json({ message: 'Unable to delete' });
    }
    res.status(200).json({ message: 'Deleted successfully'});
})

module.exports=router;
