import * as bcrypt from 'bcrypt';

export const hash = async (phrase: string) => await bcrypt.hash(phrase, 10);
