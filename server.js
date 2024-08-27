const express = require("express");

const app = express();
const port = 3000;


const listSchools = require("./controllers/listSchools");
const addSchool =  require("./controllers/addSchool");



app.use(express.json());

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>API Documentation</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          color: #333;
          line-height: 1.6;
          margin: 0;
          padding: 20px;
        }
        h1 {
          color: #333;
          text-align: center;
        }
        h2 {
          color: #555;
        }
        .endpoint {
          background-color: #fff;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          padding: 20px;
          margin: 20px 0;
        }
        .endpoint p {
          margin: 5px 0;
        }
        .code {
          background-color: #e8e8e8;
          border-radius: 5px;
          padding: 10px;
          font-family: monospace;
          overflow-x: auto;
        }
      </style>
    </head>
    <body>
      <h1>API Documentation</h1>
      
      <div class="endpoint">
        <h2>Add School API</h2>
        <p><strong>Endpoint:</strong> <span class="code">/addSchool</span></p>
        <p><strong>Method:</strong> POST</p>
        <p><strong>Payload:</strong> Includes name, address, latitude, and longitude.</p>
        <p><strong>Functionality:</strong> Validates the input data and adds a new school to the schools table.</p>
        <p><strong>Validation:</strong> Ensure all fields are properly validated before insertion (e.g., non-empty, correct data types).</p>
      </div>

      <div class="endpoint">
        <h2>List Schools API</h2>
        <p><strong>Endpoint:</strong> <span class="code">/listSchools</span></p>
        <p><strong>Method:</strong> GET</p>
        <p><strong>Parameters:</strong> User's latitude and longitude.</p>
        <p><strong>Functionality:</strong> Fetches all schools from the database, sorts them based on proximity to the user's location, and returns the sorted list.</p>
        <p><strong>Sorting Mechanism:</strong> Calculate and sort by the geographical distance between the user's coordinates and each school's coordinates.</p>
      </div>
    </body>
    </html>
  `);
});

app.post("/addSchool", addSchool);

app.get("/listSchools",listSchools);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
