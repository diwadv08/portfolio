const express=require('express');
const cloudinary=require('../cloudinary/cloudinary');
const router=express.Router();
const Skill_model=require('../models/skills');
const multer_upload=require('../multer/multer');
router.get('/skills',async(req,res)=>{
    res.json(await Skill_model.find({}))
})
router.get('/skills/:id',async(req,res)=>{
    res.json(await Skill_model.findById({_id:req.params.id}))
})

router.post('/skills_add',multer_upload.single('image'),(req,res)=>{
    const newSkill=new Skill_model({
        language:req.body.language,
        image:req.body.image,
        color:req.body.color,
        level:req.body.level,
        description:req.body.description,        
    })
    newSkill.save();
    res.json(newSkill)
})

router.post('/skills_edit', multer_upload.single('image'), async (req, res) => {
    try {
        let { id, language, color, level, description, image } = req.body;
        let updateData = { language, color, level, description,image };
        let data = await Skill_model.findByIdAndUpdate(id, updateData, { new: true });
        if (!data) {
            return res.status(404).json({ message: 'Unable to Update' });
        }
        res.status(200).json({ message: 'Updated successfully', updatedSkill: data });
    } catch (error) {
        console.error('Error updating skill:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});



router.delete('/skills_delete/:id', async (req, res) => {
    try {
      // Find the skill entry
      const skill = await Skill_model.findById(req.params.id);
      if (!skill) {
        return res.status(404).json({ message: 'Skill not found' });
      }
  
      // Extract the public ID from the image URL (if image exists)
      if (skill.image) {
        const publicId = skill.image.split('/').pop().split('.')[0]; // Extract public_id from URL
        
        // Delete from Cloudinary
        await cloudinary.uploader.destroy(publicId, (error, result) => {
          if (error) {
            console.error('Cloudinary Deletion Error:', error);
          } else {
            console.log('Cloudinary Deletion Success:', result);
          }
        });
      }
  
      // Delete from MongoDB
      await Skill_model.findByIdAndDelete(req.params.id);
      
      res.status(200).json({ message: 'Skill and image deleted successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
module.exports=router;