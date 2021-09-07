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
app.use(express.static('public'));
app.engine('handlebars',exhbs({defaultLayout: "main", layoutsDir: "views/layouts"}));
app.set("view engine", "handlebars");

app.use(body.urlencoded({extended: false}));
app.use(body.json());
app.get("/", useRoute.displayData);
app.post('/update' , useRoute.setData);
//---displaying uniqueData
app.post("/show", useRoute.showUnique)

app.listen(PORT, ()=>{
    console.log("server started on "+ PORT)
})