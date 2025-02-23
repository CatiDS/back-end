const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
    if (req.headers["authorization"]) {
        try {

            const token = req.headers["authorization"]
            const verified = jwt.verify(token, 'ParrillaCaserezDoSantos');

            if (verified) {
                next();
            } else {
                res.status(401).redirect.send({
                    message: "Token invalido, permiso denegado" 
                });
            }

        } catch (error) {
            res.status(401).send({
                message: "Acceso Denegado"
            });
        }

    } else {
        res.status(403).send({
            message: "No posee token de autorizacion"
        });
    }
}

module.exports = verificarToken;