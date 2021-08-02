function convertHTML(str) {
    var regExp = [/&/g, /</g, />/g, /"/g, /'/g];
    var chars = ['&amp;', '&lt;','&gt;','&quot;',"&apos;"];
    // search and replace loop
    for(var i = 0; i < chars.length; i++){
        str = regExp[i][Symbol.replace](str, chars[i]);
    }
    return str;
}

convertHTML("Dolce & Gabbana");