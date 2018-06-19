const mongoose=require('mongoose');
const crypto=require('crypto');
const {secret}=require('../../config.json');
const Schema=mongoose.Schema;

let user_student=Schema({
    "code":{type:String,require:true,unique:true},
    "id":{type:String,require:true,unique:true},
    "password":{type:String,require:true},
    "name":{type:String,require:true},
    "snum":{type:Number,require:true,unique:true},
    "grade":{type:Number,require:true},
    "school_class":{type:Number,require:true},
    "num":{type:Number,require:true},
    "date":{type:Date,require:false,default:Date.now}
},{
    collection:"user_student"
})

user_student.statics.signup=function(code,id,password,name,snum,grade,school_class,num){
    const resultPw = crypto.createHmac('sha1', secret)
        .update(password)
        .digest('base64');
    
    return new this({
        code,
        id,
        password:resultPw,
        name,
        snum,
        grade,
        school_class,
        num
    }).save()
}

module.exports=mongoose.model('user_student',user_student)