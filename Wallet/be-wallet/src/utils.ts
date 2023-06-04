import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

const saltRounds = 10;
const algorithm = 'aes-256-cbc';
const secretKey = Buffer.from('ba9d0a02f189faf61997b368300d690b5d5dc8c2334ea1ced2176c688c6a6448', 'hex');
const iv = Buffer.from('3aaebf17c66c473ed64d8c0ef1752b43', 'hex');


export const getHash = async (value: string) => await bcrypt.hash(value, saltRounds)

export const compareHash = async (value: string, hash: string) => await bcrypt.compare(value, hash);

export const responseError = (msg) => {
    return { statusCode: 400, message: msg }
}

export const encrypt = (value: string): string => {
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    let encrypted = cipher.update(value, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${iv.toString('hex')}:${encrypted}`;
};

export const decrypt = (encryptedValue: string): string => {
    const [ivHex, encryptedData] = encryptedValue.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};