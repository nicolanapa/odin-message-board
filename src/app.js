import express from "express";
import process from "process";

const PORT = process.env.PORT;
const app = express();

app.get("/", (req, res) => {
    res.send("test");
});

app.get("/new", (req, res) => {
    res.send("test2");
});

app.listen(PORT);
