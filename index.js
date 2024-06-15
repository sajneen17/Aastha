const express = require('express')
const ejs = require('ejs')

const bodyParser = require('body-parser')
const app = express();

const path = require("path");
// const db = require("./config/dbConfig");
const mysql =require('mysql'); 

const {login} = require("./controller/auth");
// const { Router } = require('express');
// const router = express.Router();
//use css
app.use('/public',express.static('public'));

// app.use(express.static('public'));
app.set('view engine','ejs');

//create server
const port =8080;


app.listen(port,()=>{ console.log(`server is up on port ${port}`)});
app.use(bodyParser.urlencoded({extended:true}));


//localhost:8080
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

