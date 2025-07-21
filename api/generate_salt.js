const bcrypt = require('bcrypt'); // or 'bcryptjs'
const salt = bcrypt.genSaltSync(10); // 10 is the cost factor
console.log(salt); // e.g. $2b$10$wz9ToX58kbLEmS/bmouyKu
