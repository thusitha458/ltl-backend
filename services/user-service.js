const User = require('../schemas/User');

module.exports.insertUser = async (userRole, password) => {
    let user = new User({role: userRole, password: password});
    await user.save();
};

module.exports.getUser = async userRole => {
    return await User.findOne({role: userRole});
};