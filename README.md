# masterkey
a tool to generate password from domain name and your custom key  

[See Here](https://myfreeer.github.io/masterkey/index.html) for a demo of stable version, result is shown in f12 console

[See Here](https://myfreeer.github.io/masterkey/dev.html) for a demo of dev version, result is shown in f12 console

[Click Here](https://myfreeer.github.io/masterkey/masterkey.user.js) for a userscript version, result is shown in f12 console

##Requirement
[Base64](http://www.webtoolkit.info/javascript_base64.html) by webtoolkit.info licensed CC BY 2.0 UK

[js-sha512](https://github.com/emn178/js-sha512) by emn178 licensed MIT License

[aes-js](https://github.com/ricmoo/aes-js) by ricmoo licensed MIT License

A copy of these scripts is in [src folder](https://github.com/myfreeer/masterkey/tree/gh-pages/src)

##Usage
use`masterkey.makePassword(domain, masterKey, passwordLength)`to make a password in lowercase with passwordLength

use`masterkey.makePassword2(domain, masterKey, passwordLength)`to make a password in both uppercase and lowercase with passwordLength

`domain`and`masterKey`is required for password generation, `passwordLength`will be 16 if not defined

###Example
`masterkey.makePassword2(location.hostname, "input your preferred masterKey here inside quotation marks", 16);`

###Bookmarklet
```js
javascript:(function(){if (typeof masterkey=='undefined')document.body.appendChild(document.createElement('script')).src='https://myfreeer.github.io/masterkey/src/masterkey_full.js';prompt('Password Generated for "' + masterkey.parseHostName(location.hostname) + '" :', masterkey.makePassword2(location.hostname, '/****/', 16));})();
```

**Important: Replace the** `/****/` **inside quotation marks with your preferred string as a masterkey before use**

Due to network or browser reason, you might need to **click it twice** to show the result

Bookmarklet might be blocked by [Content Security Policy](https://en.wikipedia.org/wiki/Content_Security_Policy)

##TODO
auto-filling feature for userscript version
