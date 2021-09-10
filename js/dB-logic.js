module.exports = function database(pool){
    async function getStr(str){
        var str = await pool.query("select * from reg_tows where strtown= $1", [str]);
        return str
    };
    async function setData(regNum, id){
        //check if the name exist...
         var checkname = await pool.query(`SELECT regnumber from reg_numbers WHERE regnumber = $1`, [regNum]);
                //if not insert the name...
              if (checkname.rowCount < 1) {
  
                await pool.query("insert into reg_numbers (regnumber, refid) values($1,$2)", [regNum, id])
              }
                //if name exist update the counter for that name...
              else {
                  //await pool.query(`UPDATE users SET  counter= counter + 1 WHERE name = $1`, [name])
              }

        //await pool.query("insert into reg_numbers (regnumber, refid) values($1,$2)", [regNum, id])
    }
    async function getData(){
       var data = await pool.query("select regnumber from reg_numbers");
       return await data
    } 
    
    async function getUniqueData(id){
        var data = await pool.query("select * from reg_numbers where refid= $1", [id]);
        return data
    }
    async function reset(){
        await pool.query("DELETE FROM reg_numbers");
    }
    return{
        getData,
        setData,
        getStr,
        getUniqueData,
        reset
    }
}