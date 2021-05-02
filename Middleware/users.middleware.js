const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');

const checkToken = (req, res, next) => {
    if (!req.headers['authorization']) {
        return res.status(403).json({ error: 'Debes incluir la cabecera de Authorization'});
    }

    const token = req.headers['authorization'];
    let data = {};
    try {
        data = jwt.verify(token, process.env.SECRET_KEY);
    } catch {
        return res.status(400).json({ error: 'El token no es correcto '});
    }

    if (dayjs().unix() > data.expire) {
        return res.status(400).json({ error: 'El token está caducado' });
    }

    req.userId = data.userId
    next();
}

function createToken(user) {
    const payload = {
        userId: user._id,
        rol: user.role,
        username: user.username,
        expire: dayjs().add(10, 'minutes').unix(),
    }

    return jwt.sign(payload, process.env.SECRET_KEY);
}

module.exports = {
    checkToken,
    createToken
}