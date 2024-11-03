import { Router } from "express";
import returnDate from "../scripts/returnDate.js";
import * as db from "../db/queries.js";

const newRouter = Router();

newRouter.get("/", (req, res) => {
    res.set({ "Content-Type": "text/html" });
    res.status(200);
    res.render("formSingleView");
});

newRouter.post("/", (req, res) => {
    //console.log("NEW REQUEST", req.body);

    const now = returnDate();

    if (req.body.userName.length > 0 && req.body.messageContent.length > 0) {
        db.postMessage({ text: req.body.messageContent, user: req.body.userName, added: now });
        res.redirect("/");
    } else {
        res.status(400);
        res.send("<h1>User or Message length must be greater than 0</h1>");
        throw new Error("User or Message length must be greater than 0");
    }
});

export { newRouter };
