const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bluebird = require("bluebird");

const PORT = process.env.PORT || 3001;
mongoose.Promise = bluebird;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
} else {
  app.use(express.static(__dirname + "/client/public"));
}


//routing
var articlesController = require("./server/controllers/article-controller");
var router = new express.Router();

router.use((req, res, next) => {
  console.log(req.path);
  next();
})

router.get("/api/saved", articlesController.find);
router.post("/api/saved", articlesController.insert);
router.delete("/api/saved/:id", articlesController.delete);

// Send every request to the React app
// Define any API routes before this runs
router.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.use(router);

//connect mongoose to db
const db = process.env.MONGODB_URI || "mongodb://localhost/nytreact";
mongoose.connect(db, function(error) {
  if (error) {
    console.log(error);
  }
  else {
    console.log("mongoose connection successful");
  }
});

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
