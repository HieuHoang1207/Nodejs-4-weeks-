const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const db = require("./dbGG");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const [rows] = await db
          .promise()
          .query("SELECT * FROM users WHERE google_id = ?", [profile.id]);
        if (rows.length > 0) {
          return done(null, rows[0]);
        } else {
          const newUser = {
            google_id: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
          };
          await db.promise().query("INSERT INTO users SET ?", newUser);
          return done(null, newUser);
        }
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
