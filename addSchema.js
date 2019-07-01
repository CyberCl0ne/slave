
    const mongoose = require('mongoose');

    const addSchema = mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        username: String,
        userID: String,
        birthday: String,
        respect: Number,
        mood: String,
        msgSent: Number,
        vcTime: Number,
        time: String
    });

module.exports = mongoose.model("addSchema1", addSchema);
