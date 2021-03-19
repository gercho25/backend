const router = require('express').Router();
const Value = require('../models/Value');
const Token = require('../models/Token');
// validation
const Joi = require('@hapi/joi');

const schemaValues = Joi.object({
    presion: Joi.number().min(0).max(999.99).required(),
    caudal: Joi.number().min(0).max(999.99).required(),
    viento: Joi.number().min(0.01).max(80.99).required(),
});

router.post('/:token/valores-api', async (req, res) => {

    //--- VALIDACIONES -->
    if (!req.params.token) return res.status(400).json({ error: 'Token is required' });
    const isTokenExist = await Token.findOne({ token: req.params.token });
    if (!isTokenExist) {
        return res.status(400).json({
            error: 'The token is invalid'
        });
    }
    
    if (!req.body.data) return res.status(400).json({ error: 'Data is required' });

    const values = req.body.data[0];
    if (!values) return res.status(400).json({ error: 'Data is required' });

    const { error } = schemaValues.validate(values);
    if (error) return res.status(400).json({ error: error.details[0].message });
    //<-- VALIDACIONES ---

    let saveData = { presion: null, caudal: null, viento: null };
    let saveRequired = false;

    if ( (values.presion >= 150) && (values.presion <= 180) ) {
        // Guardo en DB
        saveData.presion = values.presion;
        saveRequired = true;
    }
    if (values.viento > 40) {
        // Guardo en DB
        saveData.viento = values.viento;
        saveRequired = true;
    }

    if (saveRequired) {
        console.log('Guardo valores en DB');
        try {
            const value = new Value(saveData);
            const savedValue = await value.save();
            res.json({
                error: null,
                data: savedValue
            });
        } catch (error) {
            res.status(400).json({error});
        }
    }
    
    res.json({
        error: null,
        data: {
            title: 'The data was not saved'
        }
    });
});

module.exports = router