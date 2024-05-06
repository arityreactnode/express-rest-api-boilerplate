const fs = require('fs');

exports.generateToken = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let token = '';
    for (let i = 0; i <= 40; i++) {
        token += characters[Math.floor(Math.random() * characters.length)];
    }
    return token;
}


exports.pick = (object, keys) => {
    return keys.reduce((obj, key) => {
        if (object && Object.prototype.hasOwnProperty.call(object, key)) {
            // eslint-disable-next-line no-param-reassign
            obj[key] = object[key];
        }
        return obj;
    }, {});
};

exports.deleteFileIfExists = (filePath) => {
    if (filePath) {
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error('Error deleting file:', err);
            }
        });
    }
}

exports.generateRandomPassword = (length, numDigits = 0) => {
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numericChars = '0123456789';
    const specialChars = '@$!%#?&';

    if (length < 8 || numDigits < 0) {
        throw new Error('Invalid parameter. Password length must be at least 8, and the number of digits must be non-negative.');
    }

    let password = '';

    // Ensure at least one character from each character set
    password += getRandomChar(lowercaseChars);
    password += getRandomChar(uppercaseChars);
    password += getRandomChar(numericChars);
    password += getRandomChar(specialChars);

    // Generate remaining characters randomly
    const remainingLength = length - 4 - numDigits;
    const allChars = lowercaseChars + uppercaseChars + numericChars + specialChars;
    for (let i = 0; i < remainingLength; i++) {
        password += getRandomChar(allChars);
    }

    // Add the optional number of digit characters
    for (let i = 0; i < numDigits; i++) {
        password += getRandomChar(numericChars);
    }

    // Shuffle the password characters to make it more random
    password = password.split('').sort(() => Math.random() - 0.5).join('');

    return password;
}

function getRandomChar(characters) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters.charAt(randomIndex);
}

