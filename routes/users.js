
const express = require('express');
const router = express.Router()
const {body,validationResult} = require('express-validator');

const mongoose =require('mongoose')

const userSchema =mongoose.Schema({
    first_name:{type:String, require:true},
    last_name:{type:String,require:true},
    email:{type:String,require:true}
})

const User = mongoose.model("User",userSchema)

router.get('/',async (req,res)=>{
    const user = await User.find()
    res.json({
        user:user,
        message:'ok'
    })
    })
    router.get('/:id',async(req,res)=>{
        const user = await User.findById(req.params.id)
        if(!user) return res.status(404).json({user:'not find',message:'the user with the given id was not found'})
    res.json({
        user:user,
        message:'ok'
    })
    })
    router.post('/',[
        body('email','must be valid').isEmail(),
        body('first_name','first name cant be empty').notEmpty(),
        body('last_name','last name cant be empty').notEmpty(),
    ],async (req,res)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()){
         return res.status(400).json({data:null,errors:errors.array(),message:'validation error'})
        }
    let newUser = new User({
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email
    })

    newUser  = await newUser.save()
    res.json({
        data : newUser,
        message:'ok'
    })
    })
    // router.post('/api/users',[
    //     body('email','must be valid').isEmail(),
    //     body('firs_name','first name cant be empty').notEmpty(),
    //     body('last_name','first name cant be empty').notEmpty(),
    // ],(req,res)=>{
    //    const errors = validationResult(req);
    //    if (!errors.isEmpty()){
    //     return res.status(400).json({data:null,errors:errors.array(),message:'validation error'})
    //    }
    // users.push({id :users.length + 1,...req.body})
    // res.json({
    //     data : users,
    //     message:'ok'
    // })
    // })
    
    router.put('/:id',[
        body('email','must be valid').isEmail(),
        body('first_name','first name cant be empty').notEmpty(),
        body('last_name','first name cant be empty').notEmpty(),
    ],async (req,res)=>{
    
       const errors = validationResult(req);
       if (!errors.isEmpty()){
        return res.status(400).json({data:null,errors:errors.array(),message:'validation error'})
       }
       const user = await User.findByIdAndUpdate(req.params.id,{
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email,
       },{new:true})
       if (!user){
           return res.status(404).json({
               data : null,
               message:'the user with given id was not found'
           })
       }
   
    
    res.json({
        data : user,
        message:'ok'
    })
    })
    router.delete('/api/users/:id',async(req,res)=>{
        const user = await User.findOneAndRemove(req.params.id)
        if (!user){
            return res.status(404).json({
                data : null,
                message:'the user with given id was not found'
            })
        }
    
     
      res.json({
        data : user,
        message:'ok'
    })
    })
    module.exports = router