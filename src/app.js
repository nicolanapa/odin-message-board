import express from "express";
import process from "process";
import url from "url";
import path from "path";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT;
const app = express();

let actualDate = new Date();

let now =
    actualDate.getUTCHours() +
    ":" +
    actualDate.getUTCMinutes() +
    ":" +
    (actualDate.getUTCSeconds() < 10 ? "0" + actualDate.getUTCSeconds() : actualDate.getUTCSeconds()) +
    ", " +
    actualDate.getUTCDate() +
    "/" +
    (actualDate.getUTCMonth() + 1) +
    "/" +
    actualDate.getUTCFullYear();

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

app.post("/new", (req, res) => {
    console.log(req.body);

    actualDate = new Date();

    now =
        actualDate.getUTCHours() +
        ":" +
        actualDate.getUTCMinutes() +
        ":" +
        (actualDate.getUTCSeconds() < 10 ? "0" + actualDate.getUTCSeconds() : actualDate.getUTCSeconds()) +
        ", " +
        actualDate.getUTCDate() +
        "/" +
        (actualDate.getUTCMonth() + 1) +
        "/" +
        actualDate.getUTCFullYear();

    // Check content

    messages.push({ text: req.body.messageContent, user: req.body.userName, added: now });

    res.redirect("/");
});

app.get("/styles/:file", (req, res) => {
    console.log(req.path);
    res.sendFile(__dirname + req.path);
});

app.listen(PORT);
