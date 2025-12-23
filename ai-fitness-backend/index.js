const express = require("express");
const cors = require("cors");
require("dotenv").config();
const routes = require("./routes/generationRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/", routes);
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
