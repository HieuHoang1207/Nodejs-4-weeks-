const db = require("../utils/dbFB");

exports.findByFacebookIdOrEmail = (facebookId, email) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM users WHERE facebook_id = ? OR email = ?",
      [facebookId, email],
      (err, results) => {
        if (err) return reject(err);
        resolve(results[0]);
      }
    );
  });
};

exports.create = (user) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO users (facebook_id, email, first_name, last_name) VALUES (?, ?, ?, ?)",
      [user.facebook_id, user.email, user.first_name, user.last_name],
      (err, results) => {
        if (err) return reject(err);
        resolve({ id: results.insertId, ...user });
      }
    );
  });
};

exports.findById = (id) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM users WHERE id = ?", [id], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
};
