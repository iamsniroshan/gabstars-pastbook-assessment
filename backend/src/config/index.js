export const config = {
  endpoint: {
    url: process.env.END_POINT,
  },
  app: {
    port: process.env.BACKEND_PORT | 8000,
  },
};

export default config;
