const testModel = require('../models/test')
const mongoose = require('mongoose')

class testController {
    async test(req, res) {
        try {
            return res.json({name: 'hello world'})
        } catch (error) {
            console.error('Error creating hire', error);
            res.status(500).json({ error: 'Failed to create hire' });
        }
    }
}

module.exports = new testController;