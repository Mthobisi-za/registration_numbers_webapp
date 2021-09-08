const dbLogic = require("./dB-logic");
module.exports = function factoryFunction(pool){
    var data;
    const useDbLogic = dbLogic(pool);
    var message;
    async function setDataToDb(regNum){
        var regString = regNum.charAt(0) + regNum.charAt(1);
        var checkStringIsNotEmpty = regString !== "";
        if(checkStringIsNotEmpty){
           var data =  await useDbLogic.getStr(regString);
           var checkIfDataIsnNotEmpty = await data.rows.length !== 0;
           //--validate the format;
           var format = /CL \d+.\d+|CA \d+.\d+|CJ \d+.\d+/g;
           if(checkIfDataIsnNotEmpty && format.test(regNum)){
               //You may set The data to Db;
              await useDbLogic.setData(regNum, await data.rows[0].id);
              message = ""
           } else{
               message = "please enter valid Reg Number e.g 'CA 123-897' OR 'CJ 7865466' OR 'CL 098 879'"
            }
        } else{
            message = "Please insert a registration number in the input"
        }
    }
    async function uniqueReg(str){
        if(str === "All"){
            data = (await useDbLogic.getData()).rows;
        }else{
            
            try {
                var id = (await useDbLogic.getStr(str)).rows[0].id;
                 data = (await useDbLogic.getUniqueData(id)).rows;
            } catch (error) {
                
            }  
        }
        return await data
    }

    async function getDataFromDb(){
        var actulData;
        if(data==undefined|| data.length==0){
            actulData = (await useDbLogic.getData()).rows;
        }else{
            actulData = data;
        }
        return await actulData
    }
    function getErrors(){
        return message;
    }
    async function reset(){
        data = ""
        await useDbLogic.reset();
    }
    return{
        setDataToDb,
        getDataFromDb,
        uniqueReg,
        getErrors,
        reset
    }
}