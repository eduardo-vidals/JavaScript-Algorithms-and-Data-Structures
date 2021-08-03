function frankenSplice(arr1, arr2, n) {
    var arr1Copy = arr1.slice();
    var arr2Copy = arr2.slice();

    for (var i = 0; i < arr1.length; i++) {
        arr2Copy.splice(n+i, 0, arr1Copy[i]);
    }
    return arr2Copy;
}

frankenSplice([1, 2, 3], [4, 5, 6], 1);