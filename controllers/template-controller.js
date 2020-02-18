const templateService = require('../services/template-service');

module.exports.insertTemplate = async (req, res, next) => {
    try {
        let name = req.body.name;
        let fields = req.body.fields;

        await templateService.insertTemplate(name, fields);
        res.json();
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
    }
};