function mutation(arr) {
    var bool = true;
    for (var i = 0; i < arr[1].length; i++){
        if (!arr[0].toLowerCase().includes(arr[1][i].toLowerCase())){
            bool = false;
        }
    }
    return bool;
}

mutation(["hello", "hey"]);