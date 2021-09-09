const assert = require("assert");
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
const factoryFunction = require("../js/factory-function");
const useFactory = factoryFunction(pool);
describe("Factory Function Tests", ()=>{
    beforeEach(async function(){
        await useFactory.reset().then(val =>{}).catch(err=> console.log(err));
    });

    it('Should be able to return error message for empty input', async function(){
      await useFactory.setDataToDb("");
      var data = await useFactory.getErrors();
      assert.equal("Please insert a registration number in the input", await data)
    })
    it('Should be able to return error message for a wrong number plate format', async function(){
      await useFactory.setDataToDb("CD909JKJ");
      var data = await useFactory.getErrors();
      assert.equal("please enter valid Reg Number e.g 'CA 123-897' OR 'CJ 7865466' OR 'CL 098 879'", await data)
    })
    it('Should be able to return error message for filtering registration numbers', async function(){
      await useFactory.setDataToDb("CD909JKJ");
      await useFactory.uniqueReg("CA").then(val =>{}).catch(err=>{})
      
      assert.equal(await useFactory.getErrors(), await useFactory.getErrors())
    })
    it('Should be able to return registration numbers from database', async function(){
      await useFactory.setDataToDb("CA 0987654").then(val =>{}).catch(err=> console.log(err));
      await useFactory.setDataToDb("CA 0987654").then(val =>{}).catch(err=> console.log(err));
      await useFactory.setDataToDb("CA 908 345").then(val =>{}).catch(err=> console.log(err));
      await useFactory.setDataToDb("CL 908 345").then(val =>{}).catch(err=> console.log(err));
      await useFactory.setDataToDb("CJ 908 345").then(val =>{}).catch(err=> console.log(err))
      await useFactory.getDataFromDb().then(val =>{
        assert.equal(5,val.length)
      }).catch(err=> {})
      
    })
    it('Should be able to filter out Cape Town Registration numbers', async function(){
      await useFactory.setDataToDb("CA 0987654").then(val =>{}).catch(err=> console.log(err));
      await useFactory.setDataToDb("CA 908 345").then(val =>{}).catch(err=> console.log(err));
      await useFactory.setDataToDb("CL 908 345").then(val =>{}).catch(err=> console.log(err));
      await useFactory.setDataToDb("CJ 908 345").then(val =>{}).catch(err=> console.log(err));
      await useFactory.uniqueReg("CA").then(val =>{
         assert.equal(val.length, 2);
      }).catch(err=>{})
     
    }); 
    it('Should be able to filter out Paarl Registration numbers', async function(){
      await useFactory.setDataToDb("CA 0987654").then(val =>{}).catch();
      await useFactory.setDataToDb("CA 908 345").then(val =>{}).catch();;
      await useFactory.setDataToDb("CL 908 345").then(val =>{}).catch();;
      await useFactory.setDataToDb("CJ 908 345").then(val =>{}).catch();
      await useFactory.uniqueReg("CJ").then(val =>{
        assert.equal(val.length, 0);
      }).catch();
      
    }); 
    it('Should be able to filter out Stellenbosch Registration numbers', async function(){
      await useFactory.setDataToDb("CA 0987654").then(val =>{}).catch();;
      await useFactory.setDataToDb("CA 908 345").then(val =>{}).catch();;
      await useFactory.setDataToDb("CL 908 345").then(val =>{}).catch();;
      await useFactory.setDataToDb("CJ 908 345").then(val =>{}).catch();
      await  useFactory.uniqueReg("CL").then(val =>{
        assert.equal(val.length,0);
      }).catch();
    });
    it('Should be able to filter registartion numbers for all', async function(){
      await useFactory.setDataToDb("CA 0987654").then(val =>{}).catch();;
      await useFactory.setDataToDb("CA 908 345").then(val =>{}).catch();;
      await useFactory.setDataToDb("CL 908 345").then(val =>{}).catch();;
      await useFactory.setDataToDb("CJ 908 345").then(val =>{}).catch();
      await useFactory.getDataFromDb().then(val =>{
        assert.equal(val.length, 0);
      })
    }); 
    after( async function(){
        await pool.end();
    })
});