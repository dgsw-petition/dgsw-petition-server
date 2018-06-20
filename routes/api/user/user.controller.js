const user_student=require('../../../database/model/user_student')
const referance_user=require('../../../database/model/referance_user')

exports.check=async (req,res)=>{
    let code=req.params.code
    try{
        let check=await referance_user.findOneByCode(code)
        if(!check){
            let result={
                "code":104,
                "desc":"code is not exist"
            }
            return res.status(200).json(result)
        }
        let result={
            "code":102,
            "desc":"successful",
            "data":check
        }
        return res.status(200).json(result)
    }catch(err){
        console.log(err)
        return res.sendStatus(500)
    }
}

exports.signup=async (req,res)=>{
    const{
        code,
        id,
        password,
        name,
        snum,
        grade,
        school_class,
        num
    }=req.body
    try{
        if(await user_student.findOneByCode(code)!==null){
            let result={
                "code":103,
                "desc":"already signuped"
            }
            return res.status(200).json(result);
        }
        let user=await user_student.findOneById(id);
        if(user!==null){
            let result={
                "code":103,
                "desc":"id alreay exist"
            }
            return res.status(200).json(result);
        }
        const userSignup=await user_student.signup(code,id,password,name,snum,grade,school_class,num);
        const token=await userSignup.generateAccessToken();
        let result={
            "code":102,
            "desc":"signup is successful",
            "token":token
        }
        return res.status(200).json(result)
    }catch(error){
        console.log(error);
        console.log(error.message);
        return res.sendStatus(500).end()
    }
}