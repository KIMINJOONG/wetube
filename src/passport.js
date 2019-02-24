import passport from "passport";
import GithubStrategy from "passport-github";
import FacebookStrategy from "passport-facebook";
import User from "./models/User";
import { githubLoginCallback, facebookLoginCallback } from "./controllers/userController";
import dotenv from "dotenv";

import routes from "./routes";

passport.use(User.createStrategy());

passport.use(new GithubStrategy({
    clientID: process.env.GH_ID,
    clientSecret: process.env.GH_SECRET,
    callbackURL: process.env.PRODUCTION ? `http://ec2-13-125-110-124.ap-northeast-2.compute.amazonaws.com${routes.githubCallback}` : `http://localhost:4000${routes.githubCallback}`
    }, 
    githubLoginCallback
    )
    
);

passport.use(new FacebookStrategy({
    clientID: process.env.FB_ID,
    clientSecret: process.env.FB_SECRET,
    callbackURL: `https://soft-mayfly-45.localtunnel.me${routes.facebookCallback}`,
    profileFields: ["id", "displayName", "photos", "email"],
    scope: ["public_profile", "email"]
    },
    facebookLoginCallback
    )
);
// 여 passport야 쿠키에는 오직 user.id만 담아서 보내도록해 라고 말해주는것과 같음
passport.serializeUser(User.serializeUser());
// 일반적으로 사람들은 쿠키에 user.id를 넣고
// 그 다음 그 id로 사용자를 식별함
passport.deserializeUser(User.deserializeUser());
