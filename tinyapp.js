function generateRandomString () {
  // function goes here
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i=0; i < 5; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

exports.insertURL = function (longURL, cb) {
  let newURL = {
    shortURL: generateRandomString(),
    longURL: longURL
  };
}

exports.getLongURL = function (db, shortURL, cb) {
    let query = { "shortURL": shortURL };
    db.collection("urls").findOne(query, (err, result) => {
        if (err) {
            return cb(err);
        }

        return cb(null, result.longURL);
    });
}
