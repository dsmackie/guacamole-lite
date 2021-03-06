const Crypto = require('crypto');

class Crypt {

    constructor(app) {
        this.server = app;
    }

    decrypt(encodedString) {
        let encoded = JSON.parse(Buffer.from(encodedString, 'base64'));

        encoded.iv = Buffer.from(encoded.iv, 'base64');
        encoded.value = Buffer.from(encoded.value, 'base64');

        const decipher = Crypto.createDecipheriv(this.server.clientOptions.crypt.cypher, this.server.clientOptions.crypt.key, encoded.iv);

        let decrypted = decipher.update(encoded.value, 'binary', 'utf8');
        decrypted += decipher.final('utf8');

        return JSON.parse(decrypted);
    }

}

module.exports = Crypt;
