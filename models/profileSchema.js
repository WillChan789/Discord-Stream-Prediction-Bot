const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    userID: { type: String, require: true, unique: true },
    userName: { type: String, require: true },
    serverID: { type: String, require:true },
    points: { type: Number, default: 1000 },
});

const model = mongoose.model('ProfileModels', profileSchema);

module.exports = model;
