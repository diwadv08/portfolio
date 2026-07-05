const mongoose=require('mongoose');
const Project_model=mongoose.model("Project",{
    image:String,
    category:String,
    url:String,
})

module.exports=Project_model;