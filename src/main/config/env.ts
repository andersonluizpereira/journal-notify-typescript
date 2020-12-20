export default {
  port: process.env.PORT || 5051,
  jwtSecret: process.env.JWT_SECRET || 'tj67O==5H',
  REDIS_HOST: process.env.REDIS_HOST || 'localhost',
  REDIS_PORT: process.env.REDIS_PORT || 6379
}
