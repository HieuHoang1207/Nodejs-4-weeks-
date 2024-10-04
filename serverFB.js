const express = require("express");
const session = require("express-session");
const passport = require("passport");
require("dotenv").config();
require("./config/passportFB");

const authRoutes = require("./routes/authRoutesFB");

const app = express();

// Cấu hình session
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(authRoutes);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
