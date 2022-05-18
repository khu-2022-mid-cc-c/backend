module.exports = {
  port: parseInt(process.env.WEB_PORT ?? '3000'),
  database: {
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
  },
  jwt_secret: process.env.JWT_SECRET,
};
