function quickCheck(arr, elem) {
    // Only change code below this line
    let index = arr.indexOf(elem);
    if (index === -1){
        return false;
    } else {
        return true;
    }
    // Only change code above this line
}

console.log(quickCheck(['squash', 'onions', 'shallots'], 'mushrooms'));