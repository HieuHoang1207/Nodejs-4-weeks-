const express = require("express");
const passport = require("passport");
const session = require("express-session");
const dotenv = require("dotenv");
const db = require("./config/dbGG");
const authRoutes = require("./routes/authGG");
const setupSwagger = require("./config/swaggerGG");
const authMiddlewareGG = require("./middlewares/authMiddlewareGG");
require("./config/passportGG");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

setupSwagger(app);

app.use("/auth", authRoutes);

app.get("/protected", authMiddlewareGG, (req, res) => {
  res.json({ message: "This is a protected route", userId: req.userId });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
