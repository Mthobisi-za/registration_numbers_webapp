const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000;
const body = require("body-parser");
const exhbs = require("express-handlebars");

const session = require("express-session");
const flash = require("express-flash");
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());

const routes = require("./routes/routes");
const useRoute = routes();
const {Pool} = require("pg");
// we are using a special test database for the tests
const connectionString = process.env.DATABASE_URL;
//{connectionString, ssl: {rejectUnauthorized: false}}
var obj = {user: "postgres",host: "localhost",database: "users",password: "mthobisi",port: 5432}
var pool;
if(connectionString){
  pool = new Pool({connectionString, ssl: {rejectUnauthorized: false}});
} else{
  pool = new Pool(obj)
}

//---require the database
app.use(express.static('public'));
app.engine('handlebars',exhbs({defaultLayout: "main", layoutsDir: "views/layouts"}));
app.set("view engine", "handlebars");

app.use(body.urlencoded({extended: false}));
app.use(body.json());
app.get("/", useRoute.displayData);
app.post('/update' , useRoute.setData);
//---displaying uniqueData
app.post("/show", useRoute.showUnique)

app.get('/reset' ,useRoute.reset)

app.listen(PORT, ()=>{
    console.log("server started on "+ PORT)
})