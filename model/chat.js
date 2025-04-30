const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true
    },

    to: {
        type: String,
        required: true
    },

    msg: {
        type: String,
        required: true
    },

    created_at: {
        type: Date
    }
});

const Chat = mongoose.model("Chat", ChatSchema);
module.exports = Chat;