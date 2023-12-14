// routes/token.js
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("./../models/tr_users_model");

// Custom validation function for nestedObject
const validateNestedObject = [
    check("client_data").isObject().withMessage("nestedObject must be an object"),
    check("client_data.GRANT_TYPE")
      .isString()
      .withMessage("GRANT_TYPE is required and must be a string"),
    check("client_data.CLIENT_ID")
      .isString()
      .withMessage("CLIENT_ID is required and must be an string"),
    check("client_data.CLIENT_SECRET")
      .isString()
      .withMessage("CLIENT_SECRET is required and must be an string"),
    check("client_data.SCOPE")
      .isString()
      .withMessage("SCOPE is required and must be an string"),
    check("client_data.URL")
      .optional({ nullable: false })
      .isURL()
      .withMessage("URL must be a valid URL"),
  ];
  
  // Validation middleware for the POST endpoint
  const validatePostData = [
    check("client_name")
      .isString()
      .withMessage("name is required and must be a string"),
    ...validateNestedObject,
  ];

// Route to create a new user
router.post("/create-user", validatePostData, async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    console.log("inside request create user", req.body);
    const newUser = await User.create({
      client_name: req.body.client_name,
      client_data: req.body.client_data,
    });
    res.json(newUser);
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to get all users
router.get("/get-users", async (req, res) => {
  try {
    console.log("inside users")
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Rroute to get single user
router.get("/get-user", async (req, res) => {
  try {
    console.log("client_name", req.query.client_name);
    const clientName = req.query.client_name
      ? req.query.client_name.trim()
      : "";
    const single_user = await User.findOne({
      where: { client_name: clientName, is_deleted: false },
    });
    res.json(single_user);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
