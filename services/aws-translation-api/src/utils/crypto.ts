import * as crypto from 'crypto';

export const encryptPassword = (password: string, secretKey: string): string => {
  return crypto.createHmac('sha256', secretKey).update(password).digest('hex');
};

export const verifyPassword = (hashedPassword: string, secretKey: string): boolean => {
  const [password, hash] = hashedPassword.split('$');
  const hashedInputPassword = encryptPassword(password, secretKey);
  return hashedInputPassword === hash;
};

export const generateUUID = (): string => {
  return crypto.randomUUID();
};
