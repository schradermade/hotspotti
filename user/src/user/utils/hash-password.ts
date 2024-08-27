import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

export async function hashPassword(password: string) {
  const salt = randomBytes(8).toString('hex');
  const hash = (await scrypt(password, salt, 32)) as Buffer;
  const hashedPass = salt + '.' + hash.toString('hex');

  return hashedPass;
}
