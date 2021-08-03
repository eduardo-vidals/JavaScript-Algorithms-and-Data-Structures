function sumFibs(num) {
    let f0 = 0;
    let f1 = 1;
    let f2 = 0;
    let sum = 1;
    for (var i = 2; i <= num; i++){
        f2 = f1 + f0;
        if (f2 > num){
            break;
        }
        if (f2 % 2 !== 0){
            sum+=f2;
        }
        f0 = f1;
        f1 = f2;
    }
    return sum;
}

console.log(sumFibs(4));