# masterkey
a tool to generate password from domain name and your custom key  

[See Here](https://myfreeer.github.io/masterkey/index.html) for a demo of stable version, result is shown in f12 console

[See Here](https://myfreeer.github.io/masterkey/dev.html) for a demo of dev version, result is shown in f12 console

[Click Here](https://myfreeer.github.io/masterkey/masterkey.user.js) for a userscript version, result is shown in f12 console

## Requirement
[Base64](http://www.webtoolkit.info/javascript_base64.html) by webtoolkit.info licensed CC BY 2.0 UK

[js-sha512](https://github.com/emn178/js-sha512) by emn178 licensed MIT License

[aes-js](https://github.com/ricmoo/aes-js) by ricmoo licensed MIT License

A copy of these scripts is in [src folder](https://github.com/myfreeer/masterkey/tree/gh-pages/src)

## Usage
use`masterkey.makePassword(domain, masterKey, passwordLength)`to make a password in lowercase with passwordLength

use`masterkey.makePassword2(domain, masterKey, passwordLength)`to make a password in both uppercase and lowercase with passwordLength

`domain`and`masterKey`is required for password generation, `passwordLength`will be 16 if not defined

### Example
`masterkey.makePassword2(location.hostname, "input your preferred masterKey here inside quotation marks", 16);`

### Bookmarklet
You can [**generate a bookmarklet online**](https://myfreeer.github.io/masterkey/bookmarklet.html) or manually with the code below:
```js
javascript:(function() {var script = document.createElement('script');script.onload = function() {prompt('Password Generated for "' + masterkey.parseHostName(location.hostname) + '" :', masterkey.makePassword2(location.hostname, '/****/', 16))};script.src = "https://myfreeer.github.io/masterkey/src/masterkey_full.js";document.getElementsByTagName('head')[0].appendChild(script);})();
```

**Important: Replace the** `/****/` **inside quotation marks with your preferred string as a masterkey before use**

Due to network or browser reason, you might need to wait some seconds for the script to be loaded

Bookmarklet might be blocked by [Content Security Policy](https://en.wikipedia.org/wiki/Content_Security_Policy)

## TODO
auto-filling feature for userscript version
