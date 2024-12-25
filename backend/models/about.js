const mongoose=require('mongoose');
const About_model=mongoose.model("About",{
    name:String,
    description:String,
    title:String,
    mobile:String,
    email:String,
    image:String,
    insta_url:String,
    linkedin_url:String,
    github_url:String,
})

module.exports=About_model;