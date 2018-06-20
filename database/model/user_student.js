const mongoose=require('mongoose');
const crypto=require('crypto');
const {secret}=require('../../config.json');
const jwt=require('jsonwebtoken')
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
user_student.statics.findOneByCode=function(code){
    return this.findOne({code}).exec();
}
user_student.statics.findOneById=function(id){
    return this.findOne({id}).exec();
}

user_student.methods.verifyPassWord=function(password){
    const encryptoPassWord=crypto.createHmac('sha1',secret)
    .update(password)
    .digest('base64')

    return this.password==encryptoPassWord
}
user_student.methods.generateAccessToken=function(){
    return new Promise((resolve,reject)=>{
        jwt.sign({
            "code":this.code,
            "name":this.name,
            "snum":this.snum,
            "grade":this.grade,
            "class":this.school_class,
            "num":this.num
        },
        secret,{
            issuer:"dgsw.hs.kr",
            subject:"user-access-token",
            expiresIn: 60 * 30
        },(err, token) => {
            if (err) reject(err)
            resolve(token)
        })
    })
}

module.exports=mongoose.model('user_student',user_student)