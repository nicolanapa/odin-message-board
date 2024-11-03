import process from "process";
import pg from "pg";
import returnDate from "../scripts/returnDate";

const client = pg.Client;

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    text VARCHAR (250),
    user VARCHAR (32),
    added CHAR (19)
);

INSERT INTO messages (text, user, added) 
VALUES ("Hi there!", "Amando", ${returnDate()}),
    ("Hello World!", "Charles", ${returnDate()});
`;
