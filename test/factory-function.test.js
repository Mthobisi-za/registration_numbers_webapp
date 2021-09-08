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
        await useFactory.reset();
    });

    it('Should be able to return error message for empty input', async function(){
      await useFactory.setDataToDb("");
      var data = await useFactory.getErrors();
      assert.equal("Please insert a registration number in the input", data)
    })
    it('Should be able to return error message for a wrong number plate format', async function(){
      await useFactory.setDataToDb("CD909JKJ");
      var data = await useFactory.getErrors();
      assert.equal("please enter valid Reg Number e.g 'CA 123-897' OR 'CJ 7865466' OR 'CL 098 879'", data)
    })
    it('Should be able to return error message for a wrong number plate format', async function(){
      await useFactory.setDataToDb("CA 0987654");
      var data = await useFactory.getDataFromDb()
      assert.equal("CA 0987654", data[0].regnumber)
    })
    after( async function(){
        await pool.end();
    })
})