module.exports = function database(pool){
    async function getStr(str){
        var str = await pool.query("select * from reg_tows where strtown= $1", [str]);
        return str
    };
    async function setData(regNum, id){
        await pool.query("insert into reg_numbers (regnumber, refid) values($1,$2)", [regNum, id])
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