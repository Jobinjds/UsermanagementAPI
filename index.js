const { Client } = require("pg");
const express = require("express");
const con = require("./dbConnection");
const app = express();
app.use(express.json());
const queries = require("./query");
const mainRoutes = require("./routes");
app.use("/", mainRoutes);
require("dotenv").config();

app.get("/fetch", (req, res) => {
  const fetch_query = "Select * from users";
  con.query(query.fetch, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      // console.log(result);
      res.send(result.rows);
    }
  });
});

const PORT = 3009;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
