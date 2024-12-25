const express=require('express');
const router=express.Router();
const multer_upload=require('../multer/multer');
const About_model=require('../models/about');
router.post('/about_add',multer_upload.single('image'),(req,res)=>{
    const aboutNew=new About_model({
        name:req.body.name,
        description:req.body.description,
        title:req.body.title,
        mobile:req.body.mobile,
        email:req.body.email,
        image:req.file.filename,
        insta_url:req.body.insta_url,
        linkedin_url:req.body.linkedin_url,
        github_url:req.body.github_url,       
    })
    aboutNew.save();
    res.json(aboutNew)
})

router.get('/about',async(req,res)=>{
    res.json(await About_model.find({}))
})

module.exports=router;
