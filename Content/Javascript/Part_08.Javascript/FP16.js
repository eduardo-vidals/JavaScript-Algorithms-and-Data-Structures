const squareList = arr => {
    // Only change code below this line
    var arr = arr.filter(number => Number.isInteger(number) && number > 0);
    var arr = arr.map(number => number * number);
    return arr;
    // Only change code above this line
};

const squaredIntegers = squareList([-3, 4.8, 5, 3, -3.2]);
console.log(squaredIntegers);