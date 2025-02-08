const lodash = require('lodash');

const names= ['John', 'Jane', 'Jim', 'Jack', 'Jill'];
const capitalize = lodash.map(names, name => lodash.capitalize(name));
console.log(capitalize);
