const express=require('express');
const router=express.Router();
const verifyAdmin=require('../middleware/auth');
const multer_upload=require('../multer/multer');
const About_model=require('../models/about');
router.get('/about/:id',async(req,res)=>{
    res.json(await About_model.findById({_id:req.params.id}))
})
router.post(
  '/about_add',
  verifyAdmin,
  multer_upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'resume', maxCount: 1 }
  ]),
  async (req, res) => {

    let { id, name, description, title, mobile, email } = req.body;

    let image = req.files?.image?.[0]?.path || req.body.image;
    let resume = req.files?.resume?.[0]?.path || req.body.resume;

    let data = await About_model.findByIdAndUpdate(
      { _id: id },
      {
        name,
        description,
        title,
        mobile,
        email,
        image,
        resume   // ✅ NEW
      },
      { new: true }
    );

    if (!data) {
      return res.status(404).json({ message: 'Unable to Update' });
    }

    res.status(200).json({ message: 'Updated successfully' });
  }
);

router.get('/about',async(req,res)=>{
    res.json(await About_model.find({}))
})

module.exports=router;
