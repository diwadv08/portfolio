const express=require('express');
const router=express.Router();
const multer_upload=require('../multer/multer');
const About_model=require('../models/about');
router.get('/about/:id',async(req,res)=>{
    res.json(await About_model.findById({_id:req.params.id}))
})
router.post('/about_add',multer_upload.single('image'),async(req,res)=>{
        let {id,name,description,title,mobile,email,image}=req.body;
        let data=await About_model.findByIdAndUpdate({_id:id},{id,name,description,title,mobile,email,image})
        if (!data) {
            return res.status(404).json({ message: 'Unable to Update' });
        }
        res.status(200).json({ message: 'Updated successfully' });
})

router.get('/about',async(req,res)=>{
    res.json(await About_model.find({}))
})

module.exports=router;
