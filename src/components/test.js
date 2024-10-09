
const crypto = require('crypto');
var token = crypto.randomBytes(16).toString('hex');

const uuid = crypto.randomUUID();
console.log(uuid); 

console.log(token);