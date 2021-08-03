function sumAll(arr) {
    var sortedArr = arr.sort(function(a,b){
        return a-b;
    });
    var begin = sortedArr[0];
    var last = sortedArr[sortedArr.length - 1];
    var sum = 0;
    for (var i = begin; i <= last; i++){
        sum += i;
    }
    return sum;
}

console.log(sumAll([5, 10]));