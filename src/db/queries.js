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

export { getAllMessages, getMessage, getCountMessages };
