const mongoose=require('mongoose');
const experience_model=mongoose.model("experience",{
    company_name:String,
    from:String,
    to:String,
    experience:String,
    place:String,
    role:String,
})

module.exports=experience_model;