const { Pool } = require('pg');

// PostgreSQL connection pool setup
const pool = new Pool({
  connectionString: 'postgresql://school_ddcr_user:C45sMLllEfEMcJoxVfy5jPRAgQGtuf3R@dpg-cr663ejtq21c73ba023g-a.singapore-postgres.render.com:5432/school_ddcr',
  ssl: {
    rejectUnauthorized: false
  }
});

// SQL query to create the schools table
const createTableQuery = `
CREATE TABLE IF NOT EXISTS schools (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL
);
`;

// Function to create the table
const createTable = async () => {
  try {
    await pool.query(createTableQuery);
    console.log('Table "schools" created successfully.');
  } catch (err) {
    console.error('Error creating table:', err);
  } finally {
    pool.end(); // Close the pool connection
  }
};

// Run the createTable function
createTable();


[
    {
      "name": "Sunrise High School",
      "address": "456 Park Ave, New York, NY",
      "latitude": 40.712776,
      "longitude": -74.005974
    },
    {
      "name": "Greenwood Elementary",
      "address": "123 Elm St, Springfield, IL",
      "latitude": 39.781721,
      "longitude": -89.650148
    },
    {
      "name": "Riverside Middle School",
      "address": "789 River Rd, Austin, TX",
      "latitude": 30.267153,
      "longitude": -97.743057
    },
    {
      "name": "Horizon Academy",
      "address": "1010 Sunset Blvd, Los Angeles, CA",
      "latitude": 34.052235,
      "longitude": -118.243683
    },
    {
      "name": "Maple Leaf High",
      "address": "202 Maple St, Boston, MA",
      "latitude": 42.360081,
      "longitude": -71.058884
    }
  ]
  