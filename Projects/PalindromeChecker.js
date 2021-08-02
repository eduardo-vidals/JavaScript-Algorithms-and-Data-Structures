function palindrome(str) {
    let newStr = str.replace(/\W|_/g, '');
    newStr = newStr.toLowerCase();
    let revStr = newStr.split('').reverse().join('');
    if(newStr === revStr){
        return true;
    }
    return false;
}



palindrome("eye");