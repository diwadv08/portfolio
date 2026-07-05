const mongoose=require('mongoose');
const About_model=mongoose.model("About",{
    name:String,
    description:String,
    title:String,
    mobile:String,
    email:String,
    image:String,
})

module.exports=About_model;