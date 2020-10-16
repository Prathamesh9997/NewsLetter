const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.emailid;

//for below code refer mailchimp docs
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: fname,
          LNAME: lname
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  //for below code refer node module docs
  const url = "https://us2.api.mailchimp.com/3.0/lists/c6c3cb33a8"
  const options = {
    method: "POST",
    auth: "prathamesh:8813760557d14d61009e556203294d5b-us2"
  }

  const request = https.request(url, options, function(response) {
        if(response.statusCode === 200){
          res.sendFile(__dirname + "/success.html");
        }
        else {
          res.sendFile(__dirname + "/failure.html");
        }
    })

  request.write(jsonData);
  request.end();

});

app.post("/failure", function(req, res){
  res.redirect("/");
});

app.listen(3000, function() {
  console.log("server is running on port 3000");
});
