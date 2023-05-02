import * as bcrypt from 'bcrypt';

export const getHash = async (value: string) => await bcrypt.hash(value, await bcrypt.genSalt())

export const compareHash = async (value: string, hash: string) => await bcrypt.compare(value, hash);
