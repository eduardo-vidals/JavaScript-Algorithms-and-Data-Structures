function truncateString(str, num) {
    if (num >= str.length){
        return str
    }
    let newStr = str.substring(0, num) + "...";
    return newStr;
}

truncateString("A-tisket a-tasket A green and yellow basket", 8);