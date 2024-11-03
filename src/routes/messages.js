import { Router } from "express";

const messagesRouter = Router();

messagesRouter.get("/", (req, res) => {
    res.status(200);
    res.json(messages);
});

messagesRouter.get("/:id", (req, res) => {
    res.set({ "Content-Type": "text/html" });

    if (messages.length < req.params.id || req.params.id < 0 || !Number.isInteger(Number(req.params.id))) {
        res.status(404);
        res.send("<h1>Message of ID " + req.params.id + " doesn't exist!</h1>");
        throw new Error("Message of ID " + req.params.id + " doesn't exist!");
    }

    res.status(200);
    res.render("viewMessage", { title: "Mini Messageboard", message: messages[req.params.id], id: req.params.id });
});

export { messagesRouter };
