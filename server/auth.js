const router = require('express').Router()
const { User } = require('./db')
module.exports = router

//the full route will be http://localhost:3000/auth/login
router.put('/login', async (req, res, next) => {
    try {
        console.log('req.params:', req.body)
        const user = await User.findOne(req.body, {
            where: {
                email: req.params.email,
                password: req.params.password
            }
        })
        // console.log('USER:', user)
        if (user) {
            req.session.userId = user.id
            res.json(user);
        } else {
            const err = new Error("Incorrect email or password!");
            err.status = 401;
            next(err);
        }
    } catch (error) {
        next(error)
    }
})
const userNotFound = (next) => {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
  };
router.get('/me',async(req,res,next)=>{
   try{
    if(!req.session.userId){
        userNotFound(next)
    }else{
        const user = await User.findByPk(req.session.userId);
        user ? res.json(user) : userNotFound(next);
    }
   }catch(error){
       next(error)
   }
})

router.delete('/logout',(req,res,next)=>{
    try{
        // console.log('req.session:',req.session)
        req.session.destroy();
        res.status(204).end()
    }catch(error){
        next(error)
    }
})