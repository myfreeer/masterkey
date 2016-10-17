//masterkey password generater by myfreeer
//LGPL 3.0
(function(root) {
    "use strict";
    var parseSha = function(sha, length) {
            var length1 = Number(length) || sha.length / 2;
            var bytesKey = new Array();
            for (var i = 0; i < length1; i++) {
                bytesKey.push(parseInt(sha.substr(i * 2, 2), 16));
            }
            return bytesKey;
        },
        parseHostName = function(hostname) {
            var hostNameArray = hostname.split('.');
            var hostLength = hostNameArray.length;
            var parsedHostName = hostLength > 1 ? hostNameArray[hostLength - 2] : hostname;
            if (hostLength > 2)
                if (hostNameArray[hostLength - 2].match(/com|org|net|int|edu|gov|mil|co/g) && hostNameArray[hostLength - 2].length < 4) parsedHostName = hostNameArray[hostLength - 3];
            return parsedHostName;
        },
        makePassword = function(domain, masterKey, passwordLength1) {
            if (typeof masterKey == "undefined") {
                console.log("ERROR: masterKey is required to make a password");
                return false;
            }
            var passwordLength = Number(passwordLength1) || 16;
            var shaKey = sha512_256(masterKey);
            return makePasswordfromShaStr(domain, shaKey, passwordLength1);
        },
        makePasswordfromShaStr = function(domain, shaKey, passwordLength1) {
            var domainName = parseHostName(domain);
            if (typeof shaKey == "undefined") {
                console.log("ERROR: shaKey is required to make a password");
                return false;
            }
            if (shaKey.length !== 64) {
                console.log("ERROR: Wrong type of shaKey");
                return false;
            }
            var passwordLength = Number(passwordLength1) || 16;
            var bytesKey;
            try {
                bytesKey = parseSha(shaKey);
            } catch (e) {
                console.log("ERROR: Wrong type of shaKey");
                return false;
            }
            var textBytes = aesjs.util.convertStringToBytes(domainName);
            var aesCtr = new aesjs.ModeOfOperation.ctr(bytesKey);
            var encryptedBytes = aesCtr.encrypt(textBytes);
            var shaEncrypted = sha512(String.fromCharCode.apply(null, encryptedBytes));
            var password = shaEncrypted.substring(0, passwordLength);
            return password;
        },
        //makePassword2 can have both uppercase and lowercase with a shortet length compared to makePassword
        makePassword2 = function(domain, masterKey, passwordLength1) {
            var shaKey = sha512_256(masterKey);
            return makePassword2fromShaStr(domain, shaKey, passwordLength1);
        },
        makePassword2fromShaStr = function(domain, shaKey, passwordLength1) {
            var passwordLength = !!passwordLength1 ? passwordLength1 : 16;
            var encodedPassword = Base64.encode(String.fromCharCode.apply(null, parseSha(makePasswordfromShaStr(domain, shaKey, 128)))).replace(/[\\\/\+\=]/g, "");
            return encodedPassword.substring(0, passwordLength);
        };
    var masterkey = {
        parseHostName: parseHostName,
        makePassword: makePassword,
        makePasswordfromShaStr: makePasswordfromShaStr,
        makePassword2: makePassword2,
        makePassword2fromShaStr: makePassword2fromShaStr
    };
    if (typeof exports !== 'undefined') {
        module.exports = masterkey;
    } else if (typeof(define) === 'function' && define.amd) {
        define(masterkey);
    } else {
        root.masterkey = masterkey;
    }
})(this);
