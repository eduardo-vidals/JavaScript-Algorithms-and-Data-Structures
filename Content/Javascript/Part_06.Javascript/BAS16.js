function chunkArrayInGroups(arr, size) {
    var newArr = [];
    var count = 0;
    var innerArr = [];
    for (var i = 0; i < arr.length; i++){
        innerArr.push(arr[i]);
        count++;
        if (i == arr.length - 1 || count == size){
            newArr.push(innerArr);
            innerArr = [];
            count = 0;
        }

    }
    return newArr;
}

chunkArrayInGroups(["a", "b", "c", "d"], 2);