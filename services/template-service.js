const Template = require('../schemas/Template');
const {templates} = require('../config/config');

module.exports.insertTemplate = async (name, fields) => {
    let template = new Template({name: name, fields: fields});
    await template.save();
};

module.exports.getActionPlan = async () => {
    return await Template.findOne({name: templates.ACTION_PLAN});
};