const express=require('express');
const router=express.Router();
const Skill_model=require('../models/skills');
const multer_upload=require('../multer/multer');
router.get('/skills',async(req,res)=>{
    res.json(await Skill_model.find({}))
})
router.post('/skills_add',multer_upload.single('image'),(req,res)=>{
    const newSkill=new Skill_model({
        language:req.body.language,
        image:req.file.filename,
        color:req.body.color,
        level:req.body.level,
        description:req.body.description,        
    })
    newSkill.save();
    res.json(newSkill)
})
module.exports=router;