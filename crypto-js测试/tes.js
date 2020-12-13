var CryptoJS = require("crypto-js/crypto-js.js");

// Encrypt
var ciphertext = CryptoJS.AES.encrypt('弄好世界', 'secret key 123').toString();
console.log(ciphertext);
// Decrypt
var bytes  = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
var originalText = bytes.toString(CryptoJS.enc.Utf8);

console.log(originalText); // 'my message'
//encrypt
var rawStr = "hello world!";
var wordArray = CryptoJS.enc.Utf8.parse(rawStr);
var base64 = CryptoJS.enc.Base64.stringify(wordArray);
console.log('encrypted:', base64);
 
//decrypt
var parsedWordArray = CryptoJS.enc.Base64.parse(base64);
var parsedStr = parsedWordArray.toString(CryptoJS.enc.Utf8);
console.log("parsed:",parsedStr);
console.log("parsed:",parsedStr);