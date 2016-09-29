(function(root) {
    "use strict";
    const parseSha = function(sha, length) {
            let length1 = Number(length) || sha.length / 2;
            let bytesKey = new Array();
            for (let i = 0; i < length1; i++) {
                bytesKey.push(parseInt(sha.substr(i * 2, 2), 16));
            }
            //debugger;
            return new Uint8Array(bytesKey);
        },
        parseHostName = function(hostname) {
            let hostNameArray = hostname.split('.');
            let hostLength = hostNameArray.length;
            let parsedHostName = hostLength > 1 ? hostNameArray[hostLength - 2] : hostname;
            if (hostLength > 2)
                if (hostNameArray[hostLength - 2].match(/com|org|net|int|edu|gov|mil/g)) parsedHostName = hostNameArray[hostLength - 3];
            return parsedHostName;
        },
        makePassword = function(domain, masterKey, passwordLength1) {
            if (typeof masterKey == "undefined") {
                console.log("ERROR: masterKey is required to make a password");
                return false;
            }
            let passwordLength = Number(passwordLength1) || 16;
            let shaKey = sha512_256(masterKey);
            return makePasswordfromShaStr(domain, shaKey, passwordLength1);
        },
        makePasswordfromShaStr = function(domain, shaKey, passwordLength1) {
            //console.log(this);
            let domainName = parseHostName(domain);
            if (typeof shaKey == "undefined") {
                console.log("ERROR: shaKey is required to make a password");
                return false;
            }
            if (shaKey.length !== 64) {
                console.log("ERROR: Wrong type of shaKey");
                return false;
            }
            let passwordLength = Number(passwordLength1) || 16;
            let bytesKey;
            try {
                bytesKey = parseSha(shaKey);
            } catch (e) {
                console.log("ERROR: Wrong type of shaKey");
                return false;
            }
            let textBytes = aesjs.util.convertStringToBytes(domainName);
            let aesCtr = new aesjs.ModeOfOperation.ctr(bytesKey);
            let encryptedBytes = aesCtr.encrypt(textBytes);
            let shaEncrypted = sha512(String.fromCharCode.apply(null, encryptedBytes));
            let password = shaEncrypted.substring(0, passwordLength);
            //debugger;
            return password;
        },
        //makePassword2 can have both uppercase and lowercase with a shortet length compared to makePassword
        makePassword2 = function(domain, masterKey, passwordLength1) {
            let shaKey = sha512_256(masterKey);
            return makePassword2fromShaStr(domain, shaKey, passwordLength1);
        },
        makePassword2fromShaStr = function(domain, shaKey, passwordLength1) {
            let passwordLength = !!passwordLength1 ? passwordLength1 : 16;
            let encodedPassword = Base64.encode(String.fromCharCode.apply(null, parseSha(makePasswordfromShaStr(domain, shaKey, 128)))).replace(/[\\\/\+\=]/g, "");
            return encodedPassword.substring(0, passwordLength);
        };
    var masterkey = {
        parseSha: parseSha,
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
