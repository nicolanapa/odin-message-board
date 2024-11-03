import returnDate from "../scripts/returnDate.js";
import pool from "./pool.js";

async function getAllMessages() {
    const { rows } = await pool.query("SELECT * FROM messages");

    return rows;
}

async function getMessage(id) {
    const { rows } = await pool.query("SELECT * FROM messages WHERE id = $1", [id]);

    return rows[0];
}

async function getCountMessages() {
    return await pool.query("SELECT COUNT(id) FROM messages");
}

async function postMessage({ text, user }) {
    await pool.query(
        `
        INSERT INTO messages (text, username, added)
        VALUES ($1, $2, $3)
        `,
        [text, user, returnDate()],
    );
}

setInterval(async () => {
    await pool.query("DROP TABLE messages;");
    console.log("Deleted everything from messages TABLE");

    await pool.query(`
        CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            text VARCHAR (250),
            username VARCHAR (32),
            added CHAR (20)
        );
        
        INSERT INTO messages (text, username, added) 
        VALUES ('Hi there!', 'Amando', '${returnDate()}'),
            ('Hello World!', 'Charles', '${returnDate()}');
        `);
}, 864000000);

export { getAllMessages, getMessage, getCountMessages, postMessage };
