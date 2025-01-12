const express=require('express');
const router=express.Router();
const multer_upload=require('../multer/multer');
const Project_model=require('../models/project');
const fs=require("fs");
router.get('/project',async(req,res)=>{
    res.json(await Project_model.find({}))
})
router.get('/project/:id',async(req,res)=>{
    res.json(await Project_model.findById({_id:req.params.id}))
})

router.post('/project_add',multer_upload.single('image'),(req,res)=>{
    const projectNew=new Project_model({
        category:req.body.category,
        url:req.body.url,
        image:req.file.filename,
    })
    projectNew.save();
    res.json(projectNew);
})

router.post('/project_edit',multer_upload.single('image'),async(req,res)=>{
    let {id,category,url}=req.body;
    if(req.file){
        let image=req.file.filename;
        let findImg=await Project_model.findById(id);
        if(fs.existsSync('uploads/'+findImg.image)){
            fs.unlinkSync('uploads/'+findImg.image)
        }
        await Project_model.findByIdAndUpdate({_id:id},{image})
    }
    let data=await Project_model.findByIdAndUpdate({_id:id},{category,url})
    if (!data) {
        return res.status(404).json({ message: 'Unable to Update' });
    }
    res.status(200).json({ message: 'Updated successfully' });
})



router.delete('/project_delete/:id',async(req,res)=>{
    const deleteImage =await Project_model.findById({_id:req.params.id});
    if(fs.existsSync('uploads/'+deleteImage.image)){
        fs.unlinkSync('uploads/'+deleteImage.image)
    }
    const deleteProject =await Project_model.findByIdAndDelete({_id:req.params.id});
    if (!deleteProject) {
        return res.status(404).json({ message: 'Unable to delete' });
    }
    res.status(200).json({ message: 'Deleted successfully', user: deleteProject });
})

module.exports=router;
