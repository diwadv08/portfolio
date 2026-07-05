const mongoose=require('mongoose');
const Education_model=mongoose.model("Education",{
    grade:String,
    year:String,
    mark:String,
    college:String,
})

module.exports=Education_model;