const mongoose = require('mongoose');

const lvlSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    userID: String,
    xp: Number,
    level: Number,
    guild: String
    
})



module.exports = mongoose.model("lvlSchema", lvlSchema);
