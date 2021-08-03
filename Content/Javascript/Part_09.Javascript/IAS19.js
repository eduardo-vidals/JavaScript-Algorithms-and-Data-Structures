function addTogether() {
    let x = arguments[0];

    if(arguments.length === 2){
        if(typeof arguments[0] !== "number" || typeof arguments[1] !== "number"){
            return undefined;
        }
        return parseInt(arguments[0]) + parseInt(arguments[1]);
    }
    if(typeof x !== "number"){
        return undefined;
    }
    function singleValue(y) {
        if(typeof y !== "number"){
            return undefined;
        }
        return parseInt(x)  + parseInt(y);
    }
    return singleValue;
}
