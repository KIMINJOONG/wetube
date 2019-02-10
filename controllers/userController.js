import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => {
    res.render("join", { pageTitle: "Join" });
};

export const postJoin = async(req, res, next) => {
    const {
        body: { name, email, password, password2}
    } = req;
    if(password !== password2) {
        res.status(400);
        res.render("join", { pageTitle: "Join"});
    } else {
        // To Do:Register User
        try{
            const user = await User({
                name,
                email
            });
            await User.register(user, password);
            next();

        } catch(error) {
            console.log(error);
            res.redirect(routes.home);
        }
        // To Do:Log user in
        
    }
    
};


export const getLogin = (req, res) => res.render("login", { pageTitle: "Join" });
// 우리가 설치해준 Strategy의 이름 'local'
export const postLogin = passport.authenticate("local", {
    // passport인증 방식은, usename(여기서는 이메일)과 password를 찾아보도록 설정되어있음
    failureRedirect: routes.login,
    successRedirect: routes.home
});

export const githubLogin = passport.authenticate("github");

export const githubLoginCallback = (accessToken, refreshToekn, profile, cb) => {
    console.log(accessToken, refreshToekn, profile, cb);
}

export const postGithubLogIn = (req, res) => {
    res.send(routes.home);
}

export const logout = (req, res) => {
    //To Do: Process Log out
    req.logout();
    res.redirect(routes.home);
};
export const users = (req, res) => res.render("users", { pageTitle: "Join" });
export const userDetail = (req, res) => res.render("userDetail", { pageTitle: "Join" });
export const editProfile = (req, res) => res.render("editProfile", { pageTitle: "Join" });
export const changePassword = (req, res) => res.render("changePassword", { pageTitle: "Join" });

