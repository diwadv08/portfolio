const express=require('express');
const router=express.Router();
const Skill_model=require('../models/skills');
const multer_upload=require('../multer/multer');
const fs=require("fs");
router.get('/skills',async(req,res)=>{
    res.json(await Skill_model.find({}))
})
router.get('/skills/:id',async(req,res)=>{
    res.json(await Skill_model.findById({_id:req.params.id}))
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

router.post('/skills_edit',multer_upload.single('image'),async(req,res)=>{
    let {id,language,color,level,description}=req.body;
    if(req.file){
        let image=req.file.filename;
        let findImg=await Skill_model.findById(id);
        if(fs.existsSync('uploads/'+findImg.image)){
            fs.unlinkSync('uploads/'+findImg.image)
        }
        await Skill_model.findByIdAndUpdate({_id:id},{image})
    }
    let data=await Skill_model.findByIdAndUpdate({_id:id},{language,color,level,description})
    if (!data) {
        return res.status(404).json({ message: 'Unable to Update' });
    }
    res.status(200).json({ message: 'Updated successfully' });
})


router.delete('/skills_delete/:id',async(req,res)=>{
    const deleteImage =await Skill_model.findById({_id:req.params.id});
    if(fs.existsSync('uploads/'+deleteImage.image)){
        fs.unlinkSync('uploads/'+deleteImage.image)
    }
    const deleteProject =await Skill_model.findByIdAndDelete({_id:req.params.id});
    if (!deleteProject) {
        return res.status(404).json({ message: 'Unable to delete' });
    }
    res.status(200).json({ message: 'Deleted successfully', user: deleteProject });
})
module.exports=router;