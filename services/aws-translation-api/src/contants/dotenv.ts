const dotenv = {
  STACK_NAME: process.env.STACK_NAME || '',
  AWS_REGION: process.env.AWS_REGION || '',
  SECRET_KEY: process.env.SECRET_KEY || '',
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
  AUTH_APP_URL: process.env.AUTH_APP_URL || 'http://localhost:3000',
  DASHBOARD_APP_URL: process.env.DASHBOARD_APP_URL || 'http://localhost:3001',
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID || '',
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET || '',
};

export default dotenv;
