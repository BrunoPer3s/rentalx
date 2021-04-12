export default  {
  jwt: {
    tokenSecret: `${process.env.APP_SECRET}`,
    expiresIn: '1d',
  }
};