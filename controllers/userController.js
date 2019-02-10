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

// accessToekn과 refreshToken은 사용하지 않으니 
// _, __로 처리 순서만 맞게 변수를 주면되니까 상관없다.
export const githubLoginCallback = async(_, __, profile, cb) => {
    const { _json: { id, avatar_url: avatarUrl, name, email} } = profile;
    try{
        const user = await User.findOne({email});
        if(user) {
            user.githubId = id;
            user.save();
            return cb(null, user);
        }
        const newUser = await User.create({
            email,
            name,
            githubId: id,
            avatarUrl
        });
        return cb(null, newUser);
    
    }catch(error) {
        return cb(error);
    }
};

export const postGithubLogIn = (req, res) => {
    res.redirect(routes.home);
};

export const facebookLogin = passport.authenticate("facebook");

export const facebookLoginCallback = async (aceessToken, refreshToken, profile, cb) => {
    const { _json : {id, name, email, }} =profile;
    try {
        const user = await User.findOne({email});
        if(user) {
            user.facebookId = id;
            user.save();
            return cb(null, user);
        }
        const newUser = await User.create({
            email,
            name,
            facebookId: id,
            avatarUrl: `https://graph.facebook.com/${id}/picture?type=large`
        });
        return cb(null, newUser);
    }catch(error) {
        return cb(error);
    }

};

export const postFacebookLogin = (req, res) => {
    res.redirect(routes.home);
}

export const logout = (req, res) => {
    //To Do: Process Log out
    req.logout();
    res.redirect(routes.home);
};
export const users = (req, res) => res.render("users", { pageTitle: "Join" });

export const getMe = (req, res) => {
    res.render("userDetail", { pageTitle: "User Detail", user:req.user });
}

export const userDetail = async(req, res) => {
    const { params: { id }} = req;
    try{
        const user = await User.findById(id);
        res.render("userDetail", { pageTitle: "User Detail", user});
    }catch(error) {
        res.redirect(routes.home);
    }
};

export const editProfile = (req, res) => res.render("editProfile", { pageTitle: "Join" });
export const changePassword = (req, res) => res.render("changePassword", { pageTitle: "Join" });

