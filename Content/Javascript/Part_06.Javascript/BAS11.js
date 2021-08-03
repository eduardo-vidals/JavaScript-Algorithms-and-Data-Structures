function titleCase(str) {

    let strArr = str.split(" ");
    let newStr = "";

    for (var i = 0; i < strArr.length; i++){
        for (var j = 0; j < strArr[i].length; j++){
            if (j > 0){
                newStr += strArr[i][j].toLowerCase();
            } else {
                newStr += strArr[i][j].toUpperCase();
            }
        }
        if (i < strArr.length - 1){
            newStr += " ";
        }
    }
    console.log(newStr);
    return newStr;
}

titleCase("I'm a little tea pot");