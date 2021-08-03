function findLongestWordLength(str) {
    let strArr = str.split(' ');
    let longestWord = strArr[0];
    for (var i = 0; i < strArr.length; i++){
        if (strArr[i].length > longestWord.length){
            longestWord = strArr[i];
        }
    }
    return longestWord.length;
}

findLongestWordLength("The quick brown fox jumped over the lazy dog");