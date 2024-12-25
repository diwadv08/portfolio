const express=require('express');
const router=express.Router();
const multer_upload=require('../multer/multer');
const Project_model=require('../models/project');
router.post('/project_add',multer_upload.single('image'),(req,res)=>{
    const projectNew=new Project_model({
        category:req.body.category,
        url:req.body.url,
        image:req.file.filename,
    })
    projectNew.save();
    res.json(projectNew)
})

router.get('/project',async(req,res)=>{
    res.json(await Project_model.find({}))
})

module.exports=router;
