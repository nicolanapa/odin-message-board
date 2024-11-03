import returnDate from "../scripts/returnDate.js";
import pool from "./pool.js";

async function getAllMessages() {
    const { rows } = await pool.query("SELECT * FROM messages");

    return rows;
}

async function getMessage(id) {
    const { rows } = await pool.query("SELECT * FROM messages WHERE id = $1", [id]);

    return rows;
}

async function getCountMessages() {
    return await pool.query("SELECT COUNT(id) FROM messages");
}

async function postMessage({ text, user }) {
    await pool.query(
        `
        INSERT INTO messages (text, userName, added)
        VALUES ($1, $2, $3)
        `,
        [text, user, returnDate()],
    );
}

export { getAllMessages, getMessage, getCountMessages, postMessage };
