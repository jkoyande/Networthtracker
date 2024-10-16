// routes/userRoutes.js
const usersHandler = require('../handlers/usersHandler');
const { validateToken } = require('../middlewares/authMiddleware');

module.exports = [
    {
        method: 'POST',
        path: '/users',
        handler: usersHandler.createUser,
        options: {
            validate: {
                payload: usersHandler.userSchema,
            },
        },
    },
    {
        method: 'POST',
        path: '/login',
        handler: usersHandler.loginUser,
    },
    {
        method: 'GET',
        path: '/protected-data',
        handler: (request, h) => {
            return h.response({ message: 'This is protected data' });
        },
        options: {
            pre: [{ method: validateToken }],
        },
    },
];
