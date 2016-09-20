javascript: void((function() {
    var masterkey = 'input your preferred masterKey here inside quotation marks';
    var e = document.createElement('script');
    e.setAttribute('src', 'https://myfreeer.github.io/masterkey/src/aes.js');
    document.body.appendChild(e);
    e.setAttribute('src', 'https://myfreeer.github.io/masterkey/src/sha256.js');
    document.body.appendChild(e);

    function matchURI(uri) {
        let domainName = uri;
        try {
            let separatedURI = uri.match(/(\w[-\w]*\w)/g);
            domainName = separatedURI.length > 1 ? separatedURI[separatedURI.length - 2] : domainName;
        } catch (e) {
            //console.log(e);
        }
        return domainName;
    }

    function makePassword(domain, masterKey, passwordLength1) {
        let domainName = matchURI(domain);
        if (typeof masterKey == "undefined") {
            console.log("masterKey is required to make a password");
            return false;
        }
        let passwordLength = !!passwordLength1 ? passwordLength1 : 12;
        let shaKey = sha256(masterKey);
        let bytesKey = aesjs.util.convertStringToBytes(shaKey.substring(0, 32));
        let textBytes = aesjs.util.convertStringToBytes(domainName);
        let aesCtr = new aesjs.ModeOfOperation.ctr(bytesKey);
        let encryptedBytes = aesCtr.encrypt(textBytes);
        let shaEncrypted = sha256(encryptedBytes)
        let password = shaEncrypted.substring(0, passwordLength);
        return password;
    }

    prompt("Your Generated Password HERE", makePassword(location.hostname, masterkey, 16));
})())
