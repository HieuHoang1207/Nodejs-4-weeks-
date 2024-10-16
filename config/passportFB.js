const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../models/userModelFB");

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "http://localhost:3000/auth/facebook/callback",
      profileFields: ["id", "emails", "name"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findByFacebookIdOrEmail(
          profile.id,
          profile.emails[0].value
        );

        if (existingUser) {
          return done(null, existingUser);
        }

        const newUser = await User.create({
          facebook_id: profile.id,
          email: profile.emails[0].value,
          first_name: profile.name.givenName,
          last_name: profile.name.familyName,
        });

        return done(null, newUser);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
