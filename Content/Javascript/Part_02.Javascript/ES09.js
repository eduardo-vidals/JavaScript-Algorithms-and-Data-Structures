const sum = (...args) => {
    const arr = [];
    for (var i = 0; i < args.length; i++){
        arr.push(args[i]);
    }

    return arr.reduce((a, b) => a + b, 0);
}