const Project = require('../schemas/Project');

module.exports.insertProject = async (ct, customer, actionPlan) => {
    let project = new Project({ct: ct, customer: customer, actionPlan: actionPlan});
    await project.save();
};

module.exports.getProjects = async () => {
    return await Project.find({});
};

module.exports.getProjectByCt = async ct => {
    return await Project.findOne({ct: ct});
};

module.exports.deleteProjectByCt = async ct => {
    return await Project.deleteOne({ct: ct});
};

module.exports.updateProjectByCt = async (ct, actionPlan) => {
    return await Project.findOneAndUpdate({ct: ct}, {$set: {actionPlan: actionPlan}}, {new: true});
};