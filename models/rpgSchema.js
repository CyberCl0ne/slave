const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    userID: String,
    charName: String,
    land: String,
    stats: [
        {
            win: Number,
            loss: Number,
            money: Number,
            health: Number,
            attack: Number,
            defense: Number
        }
    ]
})

module.exports = mongoose.model('rpgSchema', schema)