import { Router } from "express";

const indexRouter = Router();

indexRouter.get("/", (req, res) => {
    res.set({ "Content-Type": "text/html" });
    res.status(200);
    res.render("index", { title: "Mini Messageboard", messages: messages });
});

export { indexRouter };
