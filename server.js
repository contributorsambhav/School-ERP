const express = require("express");
const { Pool } = require("pg");
const app = express();
const port = process.env.PORT || 3000;
const dotenv = require("dotenv");
dotenv.config();

const listSchools = require("./controllers/listSchools");
const addSchool =  require("./controllers/addSchool");

const pool = new Pool({
  connectionString: process.env.SQL_CONNECTION_URL,
  ssl: { rejectUnauthorized: false },
});

app.use(express.json());

app.post("/addSchool", addSchool);

app.get("/listSchools",listSchools);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
