import dotenv from '../../contants/dotenv';

export const cookieToObject = (cookie: string) => {
  return cookie.split(';').reduce(
    (acc, part) => {
      const [key, value] = part.trim().split('=');
      acc[key] = value;
      return acc;
    },
    {} as Record<string, string>,
  );
};

export const createTokenCookie = (token: string, expiresIn: number) => {
  const expires = new Date(Date.now() + expiresIn * 1000).toUTCString();
  const isLocalhost = String(dotenv.AUTH_APP_URL).includes('localhost');
  const cookieOptions = [`token=${token}; Expires=${expires}; Path=/; `];
  if (!isLocalhost) cookieOptions.push(`SameSite=None; Secure`);

  return cookieOptions.join('');
};

export const clearTokenCookie = () => {
  const isLocalhost = String(dotenv.AUTH_APP_URL).includes('localhost');
  const cookieOptions = ['token=; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Max-Age=0; Path=/; '];
  if (!isLocalhost) cookieOptions.push('SameSite=None; Secure');

  return cookieOptions.join('');
};
