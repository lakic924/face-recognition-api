const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require ('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'postgres',
    password : 'test',
    database : 'smart-brain'
  }
});

const app = express();


app.use(express.json());
app.use(cors())
	
app.get('/',(req,res)=>{
	res.send('success');
})
// endpoint in case of sign in
app.post('/signin',(req,res) => {signin.handleSignin(req, res, db, bcrypt)})

// endpoint in case of register
app.post('/register', (req,res) => {register.handleRegister(req, res, db, bcrypt)})
//endpoint for profile update
app.get('/profile/:id', (req,res)=>{profile.handleProfileGet(req,res,db)})

// endpoint for image
app.put ('/image', (req,res) =>{image.handleImage(req,res,db)})

app.listen(3001, ()=>{
	console.log('app is running on port 3001');
})
