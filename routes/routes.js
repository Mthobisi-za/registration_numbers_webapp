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

const factory = require("../js/factory-function");
const useFactory = factory(pool);
module.exports = function routesLogic(){
    async function displayData(req,res){
        var data =  await useFactory.getDataFromDb();
        req.flash("info", useFactory.getErrors());
        res.render("index", {data})
    }
    async function setData(req,res){
      await  useFactory.setDataToDb(req.body.regNum);
        res.redirect("/");
    }
    async function showUnique(req,res){
      var str = req.body.group;
      await useFactory.uniqueReg(str)
      res.redirect("/");
    }
    return{
        displayData,
        setData,
        showUnique
    }
}