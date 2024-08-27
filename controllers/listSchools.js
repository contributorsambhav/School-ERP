const dotenv = require("dotenv");
dotenv.config();

const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.SQL_CONNECTION_URL,
  ssl: { rejectUnauthorized: false },
});


const listSchools = async (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res
      .status(400)
      .json({ error: "Latitude and longitude are required" });
  }

  try {
    const query = `
        SELECT *, 
        (3959 * acos(
          cos(radians($1)) * cos(radians(latitude)) * cos(radians(longitude) - radians($2)) + 
          sin(radians($1)) * sin(radians(latitude))
        )) AS distance
        FROM schools
        ORDER BY distance ASC;
      `;
    const result = await pool.query(query, [latitude, longitude]);

    res.status(200).json({ schools: result.rows });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the schools" });
  }
};

module.exports = listSchools;
