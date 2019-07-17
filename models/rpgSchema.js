const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    userID: String,
    name: String,
    class: String,
    win: Number,
    loss: Number,
    money: Number,
    health: Number,
    attack: Number,
    defense: Number,
    xp: Number,
    level: Number
    
})

module.exports = mongoose.model('rpgSchema', schema);