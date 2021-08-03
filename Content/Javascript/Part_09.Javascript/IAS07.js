function myReplace(str, before, after) {
    let newStr = str.split(/\s/);
    let sliced;
    for (var i = 0; i < newStr.length; i++) {
        if (newStr[i] === before) {
            if (!isLowerCase(newStr[i][0])) {
                sliced = after.slice(1);
                after = after[0].toUpperCase() + sliced;
                newStr[i] = after;
            } else {
                sliced = after.slice(1);
                after = after[0].toLowerCase() + sliced;
                newStr[i] = after;
            }
        }
    }
    console.log(newStr);
    return newStr.join(" ");
}

function isLowerCase(str){
    return str === str.toLowerCase() && str !== str.toUpperCase();
}

myReplace("He is Sleeping on the couch", "Sleeping", "sitting")