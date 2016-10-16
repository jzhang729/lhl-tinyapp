const express = require("express");
const app = express();
const PORT = process.env.PORT || 1337;
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const tinyapp = require("./tinyapp");
const path = require("path");

const MongoClient = require('mongodb').MongoClient;
const MONGODB_URI = "mongodb://127.0.0.1:27017/url_shortener";

let dbInstance;
MongoClient.connect(MONGODB_URI, (err, db) => {
    if (err) {
        console.log("Could not connect! Unexpected error. Details below.");
        throw err;
    }

    console.log("Connected to the database!");
    dbInstance = db;
});

var urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xk": "http://www.google.com"
}

app.set("view engine", "ejs");
app.use('/public', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

app.get("/", (req, res) => {
  res.redirect("/urls");
});

app.get("/urls.json", (req, res) => {
  tinyapp.getURLS(dbInstance, (err, result) => {
    if (err) {
      console.log(err);
    }

    res.json(result);
  })
});

app.get("/urls", (req, res) => {
  tinyapp.getURLS(dbInstance, (err, result) => {
    if (err) {
      console.log(err);
    }

    let templateVars = {
      urls: result
    }
    res.render("urls_index", templateVars);
  });
});

app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

app.get("/urls/:id", (req, res) => {
  let shortURL = req.params.id
  tinyapp.getLongURL(dbInstance, shortURL, (err, longURL) => {
    let templateVars = {
        shortURL: shortURL,
        longURL: longURL
    };
    res.render("urls_show", templateVars);
  });
});

app.put("/urls/:id", (req, res) => {
  let shortURL = req.params.id;
  tinyapp.updateURL(dbInstance, shortURL, req.body.longURL, (err, longURL) => {
    res.redirect("/urls");
  })
});

app.post("/urls", (req, res) => {
  console.log("NEW URL ADDED: ",req.body.longURL);
  let longURL = req.body.longURL;
  tinyapp.insertURL(dbInstance, longURL, (err, result) => {
    if (err) {
      console.log(err);
    }

    res.redirect("/urls");
  });
});

app.get("/u/:shortURL", (req, res) => {
  let shortURL = req.params.shortURL;
  tinyapp.getLongURL(dbInstance, shortURL, (err, longURL) => {
    if (err) {
      console.log(err);
    }

    if (longURL.indexOf("http://") === -1) {
      longURL = "http://" + longURL;
    }
    res.status(301).redirect(longURL);
  });
});

app.delete("/urls/:id", (req, res) => {
  let shortURL = req.params.id;
  tinyapp.deleteURL(dbInstance, shortURL, (err, longURL) => {
    res.redirect("/urls");
  });
});
