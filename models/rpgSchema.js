const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    userID: String,
    name: String,
    class: String,
    stats: [
        {
            win: Number,
            loss: Number,
            money: Number,
            health: Number,
            attack: Number,
            defense: Number,
            level: Number
        }
    ]
})

module.exports = mongoose.model('rpgSchema', schema);