import passport from "passport";
import User from "./models/User";

passport.use(User.createStrategy());

// 여 passport야 쿠키에는 오직 user.id만 담아서 보내도록해 라고 말해주는것과 같음
passport.serializeUser(User.serializeUser());
// 일반적으로 사람들은 쿠키에 user.id를 넣고
// 그 다음 그 id로 사용자를 식별함
passport.deserializeUser(User.deserializeUser());
