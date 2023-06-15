const { User } = require('../db');

const verifyIsAdmin = (uid) => {
    const user = User.findOne({ where: { id: uid } });
    return Boolean(user.role !== 'admin');
};

module.exports = verifyIsAdmin;
