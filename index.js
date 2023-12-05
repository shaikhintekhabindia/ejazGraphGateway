const express = require("express");
const cors = require("cors");

const app = express();

// Enable CORS for all routes
app.use(cors());
const port = 3000;

app.get("/test", (req, res) => {
    res.send("Deployed successfully");
})

app.get("/hello", (req, res) => {
  var url =
    "https://login.microsoftonline.com/5fd26191-ce3b-435a-ab5c-4b9594508c45/oauth2/v2.0/token";
  var params = new URLSearchParams();
  // grant_type:client_credentials
  // client_id:ffa2f86e-6bc2-4dce-83b1-938715bcecec
  // client_secret:pkj8Q~4TSmm8NtZ0Rzt_fPwClhMWUdpVRG5xgbmU
  // scope:https://graph.microsoft.com/.default

  params.append("grant_type", "client_credentials");
  params.append("client_id", "ffa2f86e-6bc2-4dce-83b1-938715bcecec");
  params.append("client_secret", "pkj8Q~4TSmm8NtZ0Rzt_fPwClhMWUdpVRG5xgbmU");
  params.append("scope", "https://graph.microsoft.com/.default");

  function getUsersList(apiUrl, accessToken) {
    fetch("https://graph.microsoft.com/v1.0/users", {
      method: "GET",
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json", // Adjust the content type if necessary
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Process the response data
        console.log("Users data", data.value[0]);
        res.send(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }

  fetch(url, {
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
      // console.log("response after fetch ", responseData.access_token);
      getUsersList(
        "https://graph.microsoft.com/v1.0/users",
        responseData.access_token
      );
      // Process the responseData here
    })
    .catch(function (error) {
      console.error(
        "There was a problem with the fetch operation:",
        error.message
      );
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
