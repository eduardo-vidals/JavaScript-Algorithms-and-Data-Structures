function repeatStringNumTimes(str, num) {
    let newStr = "";
    for (var i = 0; i < num; i++){
        newStr += str;
    }
    return newStr;
}

repeatStringNumTimes("abc", 3);