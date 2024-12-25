const mongoose=require('mongoose');
const Skill_model=mongoose.model("Skill",{
    language:String,
    color:String,
    level:String,
    image:String,
    description:String,
})

module.exports=Skill_model;