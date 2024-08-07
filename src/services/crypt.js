const crypto = require("crypto");
const fs = require("fs");
// Este valor se reemplaza por la semila que corresponde en cada ambiente
const macroSeed = "{{reemplazar_por_la_verdadera_semilla}}";

const algorithm = "aes-256-cbc";

const AESDecrypt = (encryptedData) => {
    const decipher = crypto.createDecipheriv("aes-256-ecb", macroSeed, null);
    let deciphered = decipher.update(encryptedData, "base64", "utf8");
    deciphered += decipher.final("utf8");
    return deciphered;
};

const encrypt = (payload) => {
    // generate 16 bytes of random data
    const initVector = crypto.randomBytes(16);
    // secret key generate 32 bytes of random data
    const Securitykey = crypto.randomBytes(32);

    // the cipher function
    const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);

    // encrypt the message
    // input encoding
    // output encoding
    let encryptedData = cipher.update(payload, "utf-8", "hex");
    encryptedData += cipher.final("hex");

    const initVectorEncrypt = crypto
        .publicEncrypt(
            {
                key: fs.readFileSync(
                    `${process.env.SPA_KEY_PATH}/${process.env.SPA_CER_NAME_BE}`,
                    "utf8"
                ),
                padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                oaepHash: "sha256",
            },
            // We convert the data string to a buffer
            initVector
        )
        .toString("base64");

    const SecuritykeyEncrypt = crypto
        .publicEncrypt(
            {
                key: fs.readFileSync(
                    `${process.env.SPA_KEY_PATH}/${process.env.SPA_CER_NAME_BE}`,
                    "utf8"
                ),
                padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                oaepHash: "sha256",
            },
            // We convert the data string to a buffer
            Securitykey
        )
        .toString("base64");

    return `${encryptedData}*${initVectorEncrypt}*${SecuritykeyEncrypt}`;
};

const decrypt = (response) => {
    try {
        const decrypted = crypto.privateDecrypt(
            {
                key: fs.readFileSync(
                    `${process.env.SPA_KEY_PATH}/${process.env.SPA_KEY_NAME_FE}`,
                    "utf8"
                ),
                // In order to decrypt the data, we need to specify the
                // same hashing function and padding scheme that we used to
                // encrypt the data in the previous step
                padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                oaepHash: "sha256",
                passphrase: AESDecrypt(process.env.SPA_PASSPHRASE_FE),
            },
            Buffer.from(response, "base64")
        );

        return JSON.parse(decrypted.toString());
    } catch (e) {
        console.log("Error en decriptado", e);
    }
};

module.exports = {
    AESDecrypt,
    encrypt,
    decrypt,
};
