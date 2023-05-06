import * as bcrypt from 'bcrypt';
const saltRounds = 10;


export const getHash = async (value: string) => await bcrypt.hash(value, saltRounds)

export const compareHash = async (value: string, hash: string) => await bcrypt.compare(value, hash);

export const responseError = (msg) => {
    return { statusCode: 400, message: msg }
}