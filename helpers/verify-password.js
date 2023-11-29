const bcrypt = require('bcrypt')

const verifyPassword = async (password, hashPassword) => {
    return await bcrypt.compare(password, hashPassword);
}

module.exports = verifyPassword