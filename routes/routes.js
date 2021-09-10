
const factory = require("../js/factory-function");
const useFactory = factory();
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
      await useFactory.uniqueReg(str);
      await useFactory.getDataFromDb();
      res.redirect("/");
    }
    async function reset(req,res){
      await useFactory.reset();
      res.redirect("/")
    }
    return{
        displayData,
        setData,
        showUnique,
        reset
    }
}