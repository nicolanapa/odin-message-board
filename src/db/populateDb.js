import process from "process";
import pg from "pg";
import returnDate from "../scripts/returnDate.js";

const Client = pg.Client;

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    text VARCHAR (250),
    userName VARCHAR (32),
    added CHAR (20)
);

INSERT INTO messages (text, userName, added) 
VALUES ('Hi there!', 'Amando', '${returnDate()}'),
    ('Hello World!', 'Charles', '${returnDate()}');
`;

async function main() {
    const client = new Client({ connectionString: process.env.DB_CONNECTION_STRING });

    await client.connect();
    await client.query(SQL);
    await client.end();

    console.log("Created messages TABLE with DEFAULT VALUES");
}

main();
