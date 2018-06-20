const mongoose=require('mongoose');
const Schema=mongoose.Schema;

let referance_user=Schema({
    "code":{type:String,require:true,unique:true},
    "std_num":{type:String,require:true,unique:true},
    "std_grade":{type:Number,require:true},
    "std_class":{type:Number,require:true},
    "std_call":{type:Number,require:true},
    "std_name":{type:String,require:true}
},{
    collection:"referance_user"
})

referance_user.statics.findOneByCode=function(code){
    return this.findOne({ code }).exec();
}

module.exports=mongoose.model('referance_user',referance_user);