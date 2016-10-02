const express = require("express");
const app = express();
const PORT = process.env.PORT || 1337;
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const tinyapp = require("./tinyapp");
const path = require("path");

var urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xk": "http://www.google.com"
}

app.set("view engine", "ejs");
app.use('/public', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_DELETE"));

app.get("/", (req, res) => {
  res.redirect("/urls");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

// app.get("/hello", (req, res) => {
//   res.end("<html><body>Hello <b>World</b></body></html>\n");
// });

app.get("/urls", (req, res) => {
  let templateVars = { urls: urlDatabase };
  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

// app.get("/urls/:id", (req, res) => {
//   let templateVars = { shortUrl: req.params.id };
//   res.render("urls_show", templateVars);
// });

app.post("/urls", (req, res) => {
  console.log(req.body);
  res.send("OK");
  res.redirect("/u/")
});

app.get("/u/:shortURL", (req, res) => {
  let shortURL = req.params.shortURL;
  let longURL = urlDatabase[shortURL];
  res.status(301).redirect(longURL);
});

app.post("/urls/:id", (req, res) => {
  let shortURL = req.params.id;
  console.log("Deleting: " + shortURL);
  delete urlDatabase[shortURL];
  res.redirect("/urls");
});
