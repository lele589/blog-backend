const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');
const User = require('../models/User');

const formNormalize = (req, res, next) => {
    req.body.public === 'true' ? req.body.public = true : req.body.public = false
    req.body.pets === 'on' ? req.body.pets = true : req.body.pets = false
    req.body.date = dayjs();
    
    next();
}

module.exports = {
    formNormalize
}