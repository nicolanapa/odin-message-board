import { Router } from "express";
import * as db from "../db/queries.js";

const indexRouter = Router();

indexRouter.get("/", async (req, res) => {
    res.set({ "Content-Type": "text/html" });
    res.status(200);
    res.render("index", { title: "Mini Messageboard", messages: await db.getAllMessages() });
});

export { indexRouter };
