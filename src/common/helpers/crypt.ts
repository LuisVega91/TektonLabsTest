import * as bcrypt from 'bcrypt';

const hash = async (data: string | Buffer, saltOrRounds: string | number) => {
  return await bcrypt.hash(data, saltOrRounds);
};

const compare = async (data: string | Buffer, encrypted: string) => {
  return await bcrypt.compare(data, encrypted);
};

export const Crypt = {
  hash,
  compare,
};
