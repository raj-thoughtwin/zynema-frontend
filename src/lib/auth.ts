import { cookies } from 'next/headers';

export const setAuthCookie = (token: string) => {
  cookies().set({
    name: 'auth_token',
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
};

export const getAuthCookie = () => {
  return cookies().get('auth_token')?.value;
};

export const clearAuthCookie = () => {
  cookies().delete('auth_token');
};
