import express from "express";
import process from "process";

const PORT = process.env.PORT;
const messages = [
    {
        text: "Hi there!",
        user: "Amando",
        added: new Date(),
    },
    {
        text: "Hello World!",
        user: "Charles",
        added: new Date(),
    },
];
const app = express();

app.get("/", (req, res) => {
    res.send("test");
});

app.get("/new", (req, res) => {
    res.send("test2");
});

app.listen(PORT);
