// routes/token.js
const express = require("express");
const router = express.Router();
const User = require("./../models/tr_users_model");

router.get("/test", (req, res) => {
  res.send("Deployed successfully");
});

router.get("/token", async (req, res) => {
  const clientName = req.query.client_name ? req.query.client_name.trim() : "";
  const single_user = await User.findOne({
    where: { client_name: clientName, is_deleted: false },
  });
  if (!single_user) {
    res.send("Something bad happened");
  } else {
    var params = new URLSearchParams();
    params.append("grant_type", single_user.client_data.GRANT_TYPE);
    params.append("client_id", single_user.client_data.CLIENT_ID);
    params.append("client_secret", single_user.client_data.CLIENT_SECRET);
    params.append("scope", single_user.client_data.SCOPE);

    function getUsersList(accessToken) {
      fetch("https://graph.microsoft.com/v1.0/users", {
        method: "GET",
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          res.send(data);
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });
    }

    fetch(single_user.client_data.URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      mode: "no-cors",
      body: params,
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(function (responseData) {
        res.send(responseData);
      })
      .catch(function (error) {
        console.error("There was a problem with the fetch operation:", error);
        res.send("Something bad happened");
      });
  }
});

module.exports = router;
