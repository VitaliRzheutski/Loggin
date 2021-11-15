const router = require('express').Router()
const {User} = require('./db')
module.exports = router

//the full route will be http://localhost:3000/auth/login
router.put('/login',async(req,res,next)=>{
    try{
        console.log('req.params:',req.body)
        const user = await User.findOne(req.body,{
            where:{
                email:req.params.email,
                password:req.params.password
            }
        })
        console.log('USER:',user)
        if(!user)res.sendStatus(401);
        res.sendStatus(200)
    }catch(error){
        next(error)
    }
})