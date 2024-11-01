import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

export async function hashPassword(password: string): Promise<{
  hashedPassword: string;
  salt: string;
}> {
  const salt = randomBytes(16).toString('hex');
  const hash = (await scrypt(password, salt, 32)) as Buffer;
  const hashedPassword = salt + '.' + hash.toString('hex');

  return { hashedPassword, salt };
}

export async function validatePassword(
  password: string,
  storedHash: string,
): Promise<boolean> {
  const [salt, originalHash] = storedHash.split('.');
  const hash = (await scrypt(password, salt, 32)) as Buffer; // Hash the provided password using the same salt
  return hash.toString('hex') === originalHash; // Compare the hash of the provided password with the stored hash
}
