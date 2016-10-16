function generateRandomString () {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 6; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

exports.insertURL = function (db, longURL, cb) {
  db.collection("urls").insert({ shortURL: generateRandomString(), longURL: longURL }, (err, result) => {
    if (err) {
      return cb(err);
    }

    return cb(null, result);
  });
}

exports.updateURL = function (db, shortURL, longURL, cb) {
  let query = { "shortURL": shortURL };
  db.collection("urls").updateOne(query, { $set: { "longURL": longURL } }, (err, result) => {
    if (err) {
      return cb(err);
    }

    return cb(null, result.longURL);
  })
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

exports.getURLS = function (db, cb) {
  db.collection("urls").find({ }, {_id: 0}).toArray((err, result) => {
    if (err) {
      return cb(err);
    }

    return cb(null, result);
  });
}

exports.deleteURL = function (db, shortURL, cb) {
    let query = { "shortURL": shortURL };
    db.collection("urls").remove(query, (err, result) => {
        if (err) {
            return cb(err);
        }

        return cb(null, result);
    })
}
