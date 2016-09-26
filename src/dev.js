javascript:void((function() {
    var masterkey = 'input your preferred masterKey here inside quotation marks';
    var e = document.createElement('script');
    e.setAttribute('src', 'https://myfreeer.github.io/masterkey/src/aes.js');
    document.body.appendChild(e);
    var F = document.createElement('script');
    F.setAttribute('src', 'https://myfreeer.github.io/masterkey/src/sha256.js');
    document.body.appendChild(F);
    var G = document.createElement('script');
    G.setAttribute('src', 'https://myfreeer.github.io/masterkey/src/base64.js');
    document.body.appendChild(G);

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
        if (typeof masterKey == "undefined") {
            console.log("masterKey is required to make a password");
            return false;
        }
        let passwordLength = !!passwordLength1 ? passwordLength1 : 12;
        let shaKey = sha256(masterKey);
        let bytesKey = parseSha(shaKey);
        let textBytes = aesjs.util.convertStringToBytes(domainName);
        let aesCtr = new aesjs.ModeOfOperation.ctr(bytesKey);
        let encryptedBytes = aesCtr.encrypt(textBytes);
        let shaEncrypted = sha256(encryptedBytes)
        let password = shaEncrypted.substring(0, passwordLength);
        return password;
    }

    function makePassword2(domain, masterKey, passwordLength1) {
        let passwordLength = !!passwordLength1 ? passwordLength1 : 12;
        let encodedPassword = Base64.encode(String.fromCharCode.apply(null, parseSha(makePassword(domain, masterKey, passwordLength1)))).replace(/[\\\/\+\=]/g, "");
        return encodedPassword.substring(0, passwordLength);
    }

    prompt('Password Generated for "' + parseHostName(location.hostname) + '" :', makePassword2(location.hostname, masterkey, 16));
})())
