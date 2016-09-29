// ==UserScript==
// @name         masterkey password generater
// @namespace    myfreeer.github.io
// @version      0.2
// @description  a tool to generate password from domain name and your custom key safely
// @author       myfreeer
// @match        http://*/*
// @match        https://*/*
// @grant        GM_getValue
// @grant        GM_setValue
// @run-at       document-idle
// @require      https://myfreeer.github.io/masterkey/src/aes.js
// @require      https://myfreeer.github.io/masterkey/src/sha512.js
// @require      https://myfreeer.github.io/masterkey/src/base64.js
// @require      https://myfreeer.github.io/masterkey/src/masterkey.js
// ==/UserScript==

(function() {
    'use strict';

    if (typeof(GM_getValue("masterkey")) == 'undefined') {
        genKey();
    } else if ((GM_getValue("masterkey").length != 64)) genKey();

    function genKey() {
        GM_setValue('masterkey', sha512_256(prompt('Input your preferred MasterKey here and get your auto-generated password for each domain in F12 console.\nNOTICE: Remember the string you entered, there is no way to recover it.')));
    }

    var mykey = GM_getValue("masterkey");
    console.log('Password Generated for "' + masterkey.parseHostName(location.hostname) + '" :\n' + masterkey.makePassword2fromShaStr(location.hostname, mykey, 16));
})();
