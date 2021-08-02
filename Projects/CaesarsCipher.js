function rot13(str) {
    let charArr = [];
    let regex = /[A-Z]/;
    str = str.split("");
    for (var x in str) {
        if (regex.test(str[x])) {
            charArr.push(((str[x].charCodeAt(0) - 65 + 13) % 26) + 65);
        } else {
            charArr.push(str[x].charCodeAt(0));
        }
    }
    str = String.fromCharCode.apply(String, charArr);
    return str;
}

rot13("SERR PBQR PNZC");