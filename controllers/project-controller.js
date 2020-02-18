const moment = require('moment');

const projectService = require('../services/project-service');
const templateService = require('../services/template-service');

module.exports.insertProject = async (req, res, next) => {
    try {
        let ct = req.body.ct;
        let customer = req.body.customer;

        let actionPlan = await templateService.getActionPlan();

        let project = await projectService.getProjectByCt(ct);
        if (project) {
            res.status(400).json({error: 'Project already exists'});
        } else {
            await projectService.insertProject(ct, customer, actionPlan.fields);
            res.json();
        }
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
    }
};

module.exports.getProjects = async (req, res, next) => {
    try {
        res.json({projects: await projectService.getProjects()});
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
    }
};

module.exports.deleteProject = async (req, res, next) => {
    try {
        let ct = req.params.ct;
        if (ct) {
            await projectService.deleteProjectByCt(ct);
            res.json();
        } else {
            res.status(400).json({error: 'Missing CT'});
        }
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
    }
};

module.exports.getProjectByCt = async (req, res, next) => {
    try {
        let ct = req.params.ct;

        let project = await projectService.getProjectByCt(ct);
        if (project) {
            res.json({project: project});
        } else {
            res.status(400).json({error: 'Could not find project'});
        }
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
    }
};

module.exports.updateProject = async (req, res, next) => {
    try {
        let ct = req.params.ct;
        let actionPlan = req.body.actionPlan || [];

        let previousProject = await projectService.getProjectByCt(ct);
        if (previousProject) {
            let previousActionPlan = previousProject.actionPlan;

            let valid = true;
            actionPlan.forEach((field, fieldIndex) => {
                field.innerFields.forEach((innerField, innerFieldIndex) => {
                    let previousValue = previousActionPlan[fieldIndex].innerFields[innerFieldIndex].value;
                    let currentValue = actionPlan[fieldIndex].innerFields[innerFieldIndex].value;
                    if (innerField.editable
                        && currentValue !== previousValue
                        && req.user
                        && innerField.editableRoles.findIndex(role => role === req.user.role) === -1) {
                        valid = false;
                    }
                });
            });

            // auto set from enum
            actionPlan = actionPlan.map((field, fieldIndex) => {
                return {
                    ...field,
                    innerFields: field.innerFields.map((innerField, innerFieldIndex) => {
                        if (innerField.autoSetFromEnum) {
                            let idOfEnum = innerField.autoSetFromEnum.enumId;
                            let targetValueOfEnum = innerField.autoSetFromEnum.value;

                            let previousValueOfEnum = previousActionPlan[fieldIndex].innerFields[idOfEnum].value;
                            let currentValueOfEnum = actionPlan[fieldIndex].innerFields[idOfEnum].value;
                            if (currentValueOfEnum === targetValueOfEnum && currentValueOfEnum !== previousValueOfEnum) {
                                return {
                                    ...innerField,
                                    value: innerField.type === 'Date' ? moment().utcOffset('+0530').format('YYYY-MM-DD') : currentValueOfEnum,
                                };
                            }
                        }
                        return innerField;
                    }),
                };
            });

            if (valid) {
                let project = await projectService.updateProjectByCt(ct, actionPlan);
                if (project) {
                    res.json({project: project});
                } else {
                    res.status(400).json({error: 'Could not find project'});
                }
            }
        } else {
            res.status(400).json({error: 'Could not find project'});
        }
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
    }
};