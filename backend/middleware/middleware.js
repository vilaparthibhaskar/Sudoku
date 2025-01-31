const jwt = require('jsonwebtoken');

module.exports.authenticateToken = (req, res, next) => {
    console.log('triggered 1')
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(authHeader, token);

    if (!token) return res.status(401).send('Access denied.');

    jwt.verify(token, (process.env.JWT_SECRET || 'Bhadra@Bhaskar'), (err, user) => {
        console.log('2', err)
        if (err) return res.status(403).send('Invalid token.');
        console.log('3')
        req.user = user;
        next();
    });
};