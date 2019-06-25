
    const mongoose = require('mongoose');

    const addSchema = mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        username: String,
        userID: String,
        tarUser: String,
        tarID: String,
        motto: String,
        time: String
    });

module.exports = mongoose.model("addSchema1", addSchema);
