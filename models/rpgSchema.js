const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    userID: String,
    guildID: String,
    name: String,
    class: String,
    win: Number,
    lose: Number,
    money: Number,
    health: Number,
    attack: Number,
    defense: Number,
    xp: Number,
    level: Number
    
})

module.exports = mongoose.model('rpgSchema', schema);