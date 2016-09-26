// ==UserScript==
// @name         masterkey password generater
// @namespace    myfreeer.github.io
// @version      0.1
// @description  a tool to generate password from domain name and your custom key safely
// @author       myfreeer
// @license      GNU LGPL 3.0
// @match        http://*/*
// @match        https://*/*
// @grant        GM_getValue
// @grant        GM_setValue
// @run-at       document-idle
// @require      https://myfreeer.github.io/masterkey/src/aes.js
// @require      https://myfreeer.github.io/masterkey/src/sha512.js
// @require      https://myfreeer.github.io/masterkey/src/base64.js
// ==/UserScript==

'use strict';
if (typeof(GM_getValue("masterkey")) == 'undefined') {
    genKey();
} else if ((GM_getValue("masterkey").length != 64)) genKey();

function genKey() {
    GM_setValue('masterkey', sha512_256(prompt('Input your preferred MasterKey here and get your auto-generated password for each domain in F12 console.\nNOTICE: Remember the string you entered, there is no way to recover it.')));
    //console.log(GM_getValue("masterkey"));
}
//https://github.com/myfreeer/masterkey
//LGPL 3.0
function parseSha(sha, length) {
    length = !!length ? length : sha.length / 2;
    let bytesKey = new Array();
    for (let i = 0; i < length; i++) {
        bytesKey.push(parseInt(sha.substr(i * 2, 2), 16));
    }
    return new Uint8Array(bytesKey);
}

function parseHostName(hostname) {
    let hostNameArray = hostname.split('.');
    let hostLength = hostNameArray.length;
    let parsedHostName = hostLength > 1 ? hostNameArray[hostLength - 2] : hostname;
    if (hostLength > 2)
        if (hostNameArray[hostLength - 2].match(/com|org|net|int|edu|gov|mil/g)) parsedHostName = hostNameArray[hostLength - 3];
    return parsedHostName;
}

function makePassword(domain, masterKey, passwordLength1) {
    let domainName = parseHostName(domain);
    let passwordLength = !!passwordLength1 ? passwordLength1 : 16;
    let bytesKey = parseSha(masterKey);
    let textBytes = aesjs.util.convertStringToBytes(domainName);
    let aesCtr = new aesjs.ModeOfOperation.ctr(bytesKey);
    let encryptedBytes = aesCtr.encrypt(textBytes);
    let shaEncrypted = sha512(String.fromCharCode.apply(null, encryptedBytes));
    let password = shaEncrypted.substring(0, passwordLength);
    return password;
}
function makePassword2(domain, masterKey, passwordLength1) {
    let passwordLength = !!passwordLength1 ? passwordLength1 : 16;
    let encodedPassword = Base64.encode(String.fromCharCode.apply(null, parseSha(makePassword(domain, masterKey, passwordLength1)))).replace(/[\\\/\+\=]/g, "");
    return encodedPassword.substring(0, passwordLength);
}
var masterkey = GM_getValue("masterkey");
console.log('Password Generated for "' + parseHostName(location.hostname) + '" :\n' + makePassword2(location.hostname, masterkey, 16));
