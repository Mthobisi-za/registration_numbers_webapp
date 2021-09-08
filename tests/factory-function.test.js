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
describe("Factory Function Tests", ()=>{
    beforeEach(async function(){
        
    });

    it('Should get the tows name', async function(){
        
    })
    after(()=>{
        pool.end();
    })
})