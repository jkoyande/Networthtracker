const Hapi = require('@hapi/hapi');
const dotenv = require('dotenv');

dotenv.config();

const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT || 3000,
        host: 'localhost'
    });

    // Define routes here
    server.route(require('./routes/userRoutes'));

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();