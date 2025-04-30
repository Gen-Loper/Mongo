const express = require("express");
const app = express();
const path = require("path");
const Chat = require("./model/chat.js");
const methodOverride = require("method-override");


app.set("views", path.join(__dirname,"views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/chats');
}

app.get("/", (req, res) => { 
    res.send("working");
});

// Index route
app.get("/chats", async (req, res) => {
    let chats = await Chat.find();
    res.render("index.ejs", {chats});
});

// New chats
app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
})

app.post("/chats",(req, res) => {
    let {from, msg, to} = req.body;
    let newChat = new Chat({
        from: from,
        msg: msg,
        to: to,
        created_at: new Date()
    })
    newChat.save().then((res) => {
        console.log("Chat was saved");
    }).catch((err) => {
        console.log(err);
    })
    res.redirect("/chats");
});

// Edit route
app.get("/chats/:id/edit", async(req, res) => {
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", {chat});
});

// Update route
app.put("/chats/:id", async(req, res) => {
    let {id} = req.params;
    let {msg: newMsg} = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(id, {msg: newMsg}, {runValidators: true, new: true});
    res.redirect("/chats");
});

// Destroy route
app.delete("/chats/:id", async(req, res) => {
    let {id} = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat)
    res.redirect("/chats");
});

app.listen(8080, (req, res) => {
    console.log("Listerning on port 8080");
});