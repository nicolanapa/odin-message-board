import express from "express";
import process from "process";
import url from "url";
import path from "path";
//import returnDate from "./scripts/returnDate.js";
import { messagesRouter } from "./routes/messages.js";
import { newRouter } from "./routes/new.js";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3000;
const app = express();

/*let now = returnDate();

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
];*/

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

app.use("/messages", messagesRouter);

app.use("/new", newRouter);

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
