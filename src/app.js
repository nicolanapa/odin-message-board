import express from "express";
import process from "process";
import url from "url";
import path from "path";
import returnDate from "./scripts/returnDate.js";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3000;
const app = express();

let now = returnDate();

const messages = [
    {
        text: "Hi there!",
        user: "Amando",
        added: now,
    },
    {
        text: "Hello World!",
        user: "Charles",
        added: now,
    },
];

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname + "/styles")));
app.use(express.static(path.join(__dirname + "/scripts")));
app.use("/favicon.ico", express.static(path.join(__dirname + "/favicon.svg")));

app.get("/", (req, res) => {
    res.set({ "Content-Type": "text/html" });
    res.status(200);
    res.render("index", { title: "Mini Messageboard", messages: messages });
});

app.get("/messages", (req, res) => {
    res.status(200);
    res.json(messages);
});

app.get("/messages/:id", (req, res) => {
    res.set({ "Content-Type": "text/html" });

    if (messages.length < req.params.id || req.params.id < 0 || !Number.isInteger(Number(req.params.id))) {
        res.status(404);
        res.send("<h1>Message of ID " + req.params.id + " doesn't exist!</h1>");
        throw new Error("Message of ID " + req.params.id + " doesn't exist!");
    }

    res.status(200);
    res.render("viewMessage", { title: "Mini Messageboard", message: messages[req.params.id], id: req.params.id });
});

app.get("/new", (req, res) => {
    res.set({ "Content-Type": "text/html" });
    res.status(200);
    res.render("formSingleView");
});

app.post("/new", (req, res) => {
    //console.log("NEW REQUEST", req.body);

    now = returnDate();

    // Check content

    messages.push({ text: req.body.messageContent, user: req.body.userName, added: now });

    res.redirect("/");
});

app.get("/styles/:file", (req, res) => {
    //console.log(req.path);
    res.sendFile(__dirname + req.path);
});

app.get("/scripts/:file", (req, res) => {
    //console.log(req.path);
    res.sendFile(__dirname + req.path);
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    console.error(err);
});

app.listen(PORT);
