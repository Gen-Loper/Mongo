const mongoose = require("mongoose");
const Chat = require("./model/chat.js");
main().then(() => {
    console.log("Inserted Successfully");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/chats');
}

let allChat = [
    {
        from: "me",
        to: "you",
        msg: "I love You",
        created_at: new Date()
    },

    {
        from: "you",
        to: "me",
        msg: "I love You too",
        created_at: new Date()
    }
];

Chat.insertMany(allChat);