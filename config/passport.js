// config/passport.js
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// Giả lập một user trong cơ sở dữ liệu
const users = [
  { id: 1, username: "test", password: "test" }, // user mặc định
  { id: 2, username: "newuser", password: "newpassword" }, // user mới
];

// Cấu hình LocalStrategy
passport.use(
  new LocalStrategy((username, password, done) => {
    const user = users.find((user) => user.username === username);
    if (!user) {
      return done(null, false, { message: "Incorrect credentials." });
    }
    if (user.password !== password) {
      return done(null, false, { message: "Incorrect credentials." });
    }
    return done(null, user);
  })
);

// Xác định cách lưu trữ và truy xuất thông tin người dùng trong session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = users.find((user) => user.id === id);
  done(null, user);
});

module.exports = passport;
