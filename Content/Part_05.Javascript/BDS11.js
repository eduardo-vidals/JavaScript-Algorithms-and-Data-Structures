function filteredArray(arr, elem) {
    let newArr = [];
    // Only change code below this line
    for (var i = 0; i < arr.length; i++){
        let bool = true;
        for (var j = 0; j < arr[i].length; j++){
            if (arr[i][j] === elem){
                bool = false;
            }
        }
        if (bool === true){
            newArr.push(arr[i]);
        }
    }
    // Only change code above this line
    return newArr;
}