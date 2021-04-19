const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');
const { check } = require('express-validator');

const formNormalize = (req, res, next) => {
    req.body.public === 'true' ? req.body.public = true : req.body.public = false
    req.body.pets === 'on' ? req.body.pets = true : req.body.pets = false
    req.body.date = dayjs();
    
    next();
}

const formValidation = [
    check('title', 'El campo "título" es obligatorio').exists().trim(),
    check('category', 'El campo "categoría" es obligatorio').exists().trim(),
    check('image', 'El campo "imagen" debe tener el formato correcto de URL').isURL().optional().trim(),
    check('location', 'El campo "localización" es obligatorio y debe tener el formato correcto de URL').isURL().trim(),
    check('price', 'El campo "precio" es obligatorio y debe ser un número entre 0 y 10000').isNumeric().trim(),
    check('description', 'El campo "descripción" es obligatorio').exists().trim(),
    check('pets', 'El campo "mascotas" es obligatorio y debe ser un buleano').isBoolean(),
    check('public', 'El campo "publicar" es obligatorio y debe ser un buleano').isBoolean(),
]

module.exports = {
    formNormalize,
    formValidation
}