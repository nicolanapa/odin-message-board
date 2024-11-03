import pg from "pg";
import process from "process";

const { Pool } = pg;

export default new Pool({ connectionString: process.env.DB_CONNECTION_STRING });
