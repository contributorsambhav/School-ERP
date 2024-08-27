const express = require("express");

const app = express();
const port = 3000;


const listSchools = require("./controllers/listSchools");
const addSchool =  require("./controllers/addSchool");



app.use(express.json());

app.post("/addSchool", addSchool);

app.get("/listSchools",listSchools);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
