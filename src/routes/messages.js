import { Router } from "express";
import * as db from "../db/queries.js";

const messagesRouter = Router();

messagesRouter.get("/", async (req, res) => {
    res.status(200);
    res.json(await db.getAllMessages());
});

messagesRouter.get("/:id", async (req, res) => {
    const message = await db.getMessage(req.params.id);

    res.set({ "Content-Type": "text/html" });

    if (
        db.getCountMessages() < req.params.id ||
        req.params.id < 0 ||
        !Number.isInteger(Number(req.params.id)) ||
        message === undefined
    ) {
        res.status(404);
        res.send("<h1>Message of ID " + req.params.id + " doesn't exist!</h1>");
        throw new Error("Message of ID " + req.params.id + " doesn't exist!");
    }

    res.status(200);
    res.render("viewMessage", { title: "Mini Messageboard", message: message, id: req.params.id });
});

export { messagesRouter };
