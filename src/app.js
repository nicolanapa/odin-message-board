import express from "express";
import process from "process";
import url from "url";
import path from "path";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT;
const app = express();

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

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.set({ "Content-Type": "text/html" });
    res.status(200);
    res.render("index", { title: "Mini Messageboard", messages: messages });
});

app.get("/new", (req, res) => {
    res.set({ "Content-Type": "text/html" });
    res.status(200);
    res.render("form");
});

app.listen(PORT);
