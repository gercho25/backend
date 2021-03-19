const router = require('express').Router();
const Token = require('../models/Token');
// validation
const Joi = require('@hapi/joi');

const schemaToken = Joi.object({
    token: Joi.string().alphanum().min(3).max(200).required()
});

router.get('/', (req, res) => {
    res.json({
        error: null,
        data: {
            title: 'private endpoint',
            user: req.user
        }
    });
});

router.post('/create-token', async (req, res) => {
    
    //--- VALIDACIONES -->
    if (!req.body.token) return res.status(400).json({ error: 'Token is required' });

    const { error } = schemaToken.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const isTokenExist = await Token.findOne({ token: req.body.token });
    if (isTokenExist) {
        return res.status(400).json({
            error: 'The tokenalready exists'
        });
    }
    //<-- VALIDACIONES ---

    try {
        const token = new Token(req.body);
        const savedToken = await token.save();
        res.json({
            error: null,
            data: savedToken
        });
    } catch (error) {
        res.status(400).json({error});
    }

});

module.exports = router