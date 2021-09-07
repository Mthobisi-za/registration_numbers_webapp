function makeChanges() {
    ///global values
    var arg = []
    var name;
    var lang;
    //global values
    ///collect user input
    function setUserName(str) {
        var checkNum = /\d/;
        if (checkNum.test(str) && str !== "") {
            return "Please input text that has alphabetic values only."
        } else {
            name = str.toLowerCase()
            return str.toLowerCase()
        }
    }

    function setUserLang(str) {
        if (str == "Isizulu" || str == "isizulu") {
            return lang = "Saw'bona"
        } else if (str == "English" || str == "english") {
            return lang = "Hello"
        } else {
            return lang = "Dumela"
        }
    }
    //collect user inputs
    //store the values to local storage
    function storeNames() {
        var local = localStorage.getItem("names");
        //reference local storage
        if (local == null) {
            //does not exist and local storage is not declared
            arg.push(name)
            localStorage.setItem("names", arg)
            return localStorage.getItem("names")
        } else if (localStorage.getItem("names").indexOf(name) !== -1) {
            ///already exist
            return "already exist"
        } else {
            //add the arrays and assign new values
            var df = [localStorage.getItem("names")];
            df.push(name)
            localStorage.setItem("names", df);
            return localStorage.getItem("names")
        }
    }
    //store the values to local storage
    ///get the counter
    function getCounter() {
        return localStorage.getItem("names").split(',').length;
    }
    ///get the counter
    ////return an objects factory functions
    return {
        setUserName,
        setUserLang,
        storeNames,
        getCounter
    }
}