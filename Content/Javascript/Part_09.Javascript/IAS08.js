function pairElement(str) {
    let arr = [];
    for (var i = 0; i < str.length; i++) {
        let inner = [];
        switch(str[i]){
            case 'A':
                inner.push('A');
                inner.push('T');
                break;
            case 'T':
                inner.push('T');
                inner.push('A');
                break;
            case 'C':
                inner.push('C');
                inner.push('G');
                break;
            case 'G':
                inner.push('G');
                inner.push('C');
                break;
        }
        arr.push(inner);
    }
    console.log(arr);
    return arr;
}

pairElement("ATCGA");