const express = require('express');

const { default: helmet } = require('helmet');

const morgan = require('morgan')
const app = express();
const config = require('config')
const debug = require('debug')('app:main')
const userRouter = require('./routes/users')
const homeRouter = require('./routes/home')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(helmet())
app.set('view engine', 'ejs');
app.set('views','./views')
// using for config package
// console.log("Application name",config.get("name"))
// console.log("version",config.get("version"))
// console.log("SMS",config.get("SMS"))
// console.log("SMS key",config.get("SMS.key")) kar nemikone
console.log(process.env.NODE_ENV)
if(app.get('env') == 'development'){
    console.log('morgan is active')
    app.use(morgan('tiny'))

}

console.log('NODE_ENV:',process.env.NODE_ENV)
console.log(app.get('env'))



app.use('/api/users', userRouter )
app.use('/', homeRouter )


const port =process.env.PORT || 3000
app.listen(3000,()=>{
    console.log(port)
})