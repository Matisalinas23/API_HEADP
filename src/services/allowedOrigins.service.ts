const allowedOrigins: (string | RegExp)[] = [
  'http://localhost:3001',
  'https://api-headp.onrender.com',
  'https://front-headp.vercel.app',
]

export const corsOrigin = (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
  if (!origin) return callback(null, true);

  if (
    allowedOrigins.includes(origin) ||
    allowedOrigins.some(or => or instanceof RegExp && or.test(origin))
  ) {
    return callback(null, true);
  }

  return callback(new Error("CORS not allowed by server"));
};