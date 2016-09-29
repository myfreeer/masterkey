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

##TODO
auto-filling feature for userscript version
