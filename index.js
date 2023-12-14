const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

require("dotenv").config();
app.use(express.json());

const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Require route modules
const tokenRoutes = require('./routes/token');
const usersRoutes = require('./routes/users');

// Use route modules
app.use('/', tokenRoutes);
app.use('/users', usersRoutes);

const sequelize = require("./database/connection");

// Synchronize the model with the database and create the table if it doesn't exist
sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized successfully");
  })
  .catch((err) => {
    console.error("Error synchronizing database:", err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
