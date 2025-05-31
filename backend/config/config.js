module.exports = {
    port: process.env.PORT || 5000,
    cors: {
        origin: process.env.CORS_ORIGIN || '*',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type']
    }
}; 