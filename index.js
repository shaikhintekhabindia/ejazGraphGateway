const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

const GRANT_TYPE = process.env.GRANT_TYPE;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const SCOPE = process.env.SCOPE;
const PORT = process.env.PORT;
const TOKEN_URL = process.env.TOKEN_URL;

app.use(cors());
const port = PORT;

app.get("/test", (req, res) => {
  res.send("Deployed successfully");
});

app.get("/token", (req, res) => {
  var params = new URLSearchParams();  
  params.append("grant_type", GRANT_TYPE);
  params.append("client_id", CLIENT_ID);
  params.append("client_secret", CLIENT_SECRET);
  params.append("scope", SCOPE);

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
        console.log("Users data", data.value[0]);
        res.send(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }

  fetch(TOKEN_URL, {
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
      console.error(
        "There was a problem with the fetch operation:",
        error
      );
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
