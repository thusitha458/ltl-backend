const Project = require('../schemas/Project');

module.exports.insertProject = async (ct, customer, items, actionPlan) => {
    let project = new Project({ct: ct, customer: customer, items: items, actionPlan: actionPlan});
    await project.save();
};

module.exports.getProjects = async () => {
    const projects = await Project.find({}) || [];
    return projects.sort((a, b) => {
        const ct1 = a.ct.replace(/\s/g, '');
        const ct2 = b.ct.replace(/\s/g, '');
        if (ct1 === ct2) {
            return 0;
        }
        return ct1 > ct2 ? 1 : -1;
    });
};

module.exports.getProjectByCt = async ct => {
    return await Project.findOne({ct: ct});
};

module.exports.deleteProjectByCt = async ct => {
    return await Project.deleteOne({ct: ct});
};

module.exports.updateProjectByCt = async (ct, customer, items, actionPlan) => {
    let updateQuery = undefined;
    if (customer) {
        updateQuery = { ...updateQuery, customer };
    }
    if (items) {
        updateQuery = { ...updateQuery, items };
    }
    if (actionPlan) {
        updateQuery = { ...updateQuery, actionPlan };
    }
    if (updateQuery) {
        return await Project.findOneAndUpdate({ct: ct}, {$set: updateQuery}, {new: true});
    }
};