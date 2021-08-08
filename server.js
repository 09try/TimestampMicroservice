// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date?", (req, res) => {
  let myResponse = { error: "Invalid Date" };

  try {

    if (req.params.date !== undefined) {
      
      let myDate = null;
      let isNumber = /^\d+$/.test(req.params.date);

      if(isNumber == true){
        myDate = new Date(Number(req.params.date));
      } else {
        let tmp = Date.parse(req.params.date);
        myDate = new Date(tmp);
      }

      if (myDate != null && myDate != 'Invalid Date' && isNaN(myDate) == false) {
        let unix = Math.floor(myDate);
        let utc = myDate.toUTCString();

        myResponse = { unix: unix, utc: utc };
      }
    } else {
      let now = Date.now();
      let unix = Math.floor(now);
      let utc = new Date(now).toUTCString();

      myResponse = { unix: unix, utc: utc };
    }
  } catch (error) {
    console.log(error);
  }

  res.json(myResponse);
});

// listen for requests :)
const PORT = process.env.PORT || 3001;
var listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
