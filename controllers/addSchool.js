const dotenv = require("dotenv");
dotenv.config();


const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.SQL_CONNECTION_URL,
  ssl: { rejectUnauthorized: false },
});


const addSchool = async (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || !latitude || !longitude) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const query = `
        INSERT INTO schools (name, address, latitude, longitude)
        VALUES ($1, $2, $3, $4)
        RETURNING id;
      `;
    const result = await pool.query(query, [
      name,
      address,
      latitude,
      longitude,
    ]);

    res.status(201).json({
      school: {
        id: result.rows[0].id,
        name,
        address,
        latitude,
        longitude,
      },
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while adding the school" });
  }
};


module.exports = addSchool