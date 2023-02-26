export default {
    port: getEnv('PORT', '3000'),
    host: getEnv('DB_HOST', 'localhost'),
    dbUri: getEnv('DB_URI', 'mongodb://127.0.0.1:27017/rest-api'),
    saltWorkFactor: getEnv('SALT_WORK_FACTOR', '10'),
    accessTokenTtl: getEnv('ACCESS_TOKEN_TTL', '5m'),
    refreshTokenTtl: getEnv('REFRESH_TOKEN_TTL', '1d'),
    privateKey: getEnv('JWT_SECRET_KEY', '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'),
};