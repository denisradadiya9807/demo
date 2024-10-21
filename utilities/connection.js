let mongoose = require('mongoose');
let mongoConection = mongoose.createConnection(process.env.MONGO_URI);
module.exports = mongoConection;