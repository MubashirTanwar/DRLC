const { error } = require('console');
var express = require('express');
var mysql = require('mysql2');
var app = express();
require('dotenv').config()
var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', './views');

app.use(express.urlencoded({extended: false}));



app.set("view engine", "ejs");

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});
connection.connect((error) => {
  if (error) {
      console.error('Error connecting to the database: ', error);
  } else {
      console.log('Connected to the database.');
  }
});




app.get('/', function (req, res) {
  const getUser = "SELECT * from student"
  connection.query(getUser,(err, result)=>{
    if(err) throw err;
    res.render('index.ejs',{result : result});
  })
});
app.post('/register', async(req,res)=>{
  console.log("Received a POST request to /register");
  const email = req.body.email;
  const prn = req.body.prn;
  const password = req.body.password;
  const branch = req.body.branch;
  const year = req.body.year;
  const gender = req.body.gender;
  const card = req.body.card;
  const post = `INSERT into student (PRN,domain_id,password,branch,year,gender,id_card) values(${prn},'${email}','${password}','${branch}','${year}','${gender}','${card}')`;
  connection.query(post,(err)=>{
    if (err) throw err;
    console.log('User signed up successfully!');
    res.redirect("/");
  })
})

app.get('/register',function(req,res){
  res.render("register.ejs")
})
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

