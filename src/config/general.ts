export default () => ({
  general: {
    env: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT, 10) || 7000,
  },
});
