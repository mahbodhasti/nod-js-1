const express = require('express');
const {body,validationResult} = require('express-validator');
const { default: helmet } = require('helmet');
let users = require('./users')
const morgan = require('morgan')
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(helmet())

if(app.get('env') == 'development'){
    console.log('morgan is active')
    app.use(morgan('tiny'))

}

console.log('NODE_ENV:',process.env.NODE_ENV)
console.log(app.get('env'))

app.get('/api/users',(req,res)=>{
res.json({
    user:users,
    message:'ok'
})
})
app.get('/api/users/:id',(req,res)=>{
    const user = users.find( u => u.id === parseInt(req.params.id) )
    if(!user) return res.status(404).json({user:'not find',message:'the user with the given id was not found'})
res.json({
    user:user,
    message:'ok'
})
})
app.post('/api/users',[
    body('email','must be valid').isEmail(),
    body('first_name','first name cant be empty').notEmpty(),
    body('last_name','last name cant be empty').notEmpty(),
],(req,res)=>{
   const errors = validationResult(req);
   if (!errors.isEmpty()){
    return res.status(400).json({data:null,errors:errors.array(),message:'validation error'})
   }
users.push({id :users.length + 1,...req.body})
res.json({
    data : users,
    message:'ok'
})
})
app.post('/api/users',[
    body('email','must be valid').isEmail(),
    body('firs_name','first name cant be empty').notEmpty(),
    body('last_name','first name cant be empty').notEmpty(),
],(req,res)=>{
   const errors = validationResult(req);
   if (!errors.isEmpty()){
    return res.status(400).json({data:null,errors:errors.array(),message:'validation error'})
   }
users.push({id :users.length + 1,...req.body})
res.json({
    data : users,
    message:'ok'
})
})

app.put('/api/users/:id',[
    body('email','must be valid').isEmail(),
    body('first_name','first name cant be empty').notEmpty(),
    body('last_name','first name cant be empty').notEmpty(),
],(req,res)=>{
    const user = users.find(u=>u.id == req.params.id);
    if (!user){
        return res.status(404).json({
            data : null,
            message:'the user with given id was not found'
        })
    }

   const errors = validationResult(req);
   if (!errors.isEmpty()){
    return res.status(400).json({data:null,errors:errors.array(),message:'validation error'})
   }
   users = users.map(user=>{
   if (user.id == req.params.id){
    return {...user,...req.body}
   }
   return user
   })

res.json({
    data : users,
    message:'ok'
})
})
app.delete('/api/users/:id',(req,res)=>{
    const user = users.find(u=>u.id == req.params.id);
    if (!user){
        return res.status(404).json({
            data : null,
            message:'the user with given id was not found'
        })
    }

  const index = users.indexOf(user);
  users.splice(index,1)
  res.json({
    data : users,
    message:'ok'
})
})

const port =process.env.PORT || 3000
app.listen(3000,()=>{
    console.log(port)
})