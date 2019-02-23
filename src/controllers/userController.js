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
        req.flash('error', 'Passwords dont match');
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
    successRedirect: routes.home,
    successFlash: "Welcom",
    failureFlash: "Cant log in. Check email and/or password"
});

export const githubLogin = passport.authenticate("github", {
    successFlash: "Welcom",
    failureFlash: "Cant log in. Check email and/or password"
});

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

export const facebookLogin = passport.authenticate("facebook",{
    successFlash: "Welcom",
    failureFlash: "Cant log in. Check email and/or password"
});

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
    req.flash('info', "Logged out, see you later.");
    //To Do: Process Log out
    req.logout();
    res.redirect(routes.home);
};
export const users = (req, res) => res.render("users", { pageTitle: "Join" });

export const getMe = (req, res) => {
    res.render("userDetail", { pageTitle: "User Detail", user:req.user });
};

export const userDetail = async(req, res) => {
    const { params: { id }} = req;
    try{
        const user = await User.findById(id).populate("videos");
        res.render("userDetail", { pageTitle: "User Detail", user});
    }catch(error) {
        req.flash("error", "User not found");
        res.redirect(routes.home);
    }
};

export const getEditProfile = (req, res) => 
    res.render("editProfile", { pageTitle: "Edit Profile" });

export const postEditProfile = async(req, res) => {
    const {
        body: {name, email},
        file
    } = req;

    try{
        await User.findByIdAndUpdate(req.user.id, {
            name, 
            email, 
            avatarUrl: file ? file.location : req.user.avatarUrl
        });
        req.flash("success", "Profile updated");
        res.redirect(routes.me);
    }catch(error) {
        req.flash("error", "Can't Update Profile");
        res.render("editProfile", {pageTitle: "Edit Profile"});
    }

}

export const getChangePassword = (req, res) => 
    res.render("changePassword", { pageTitle: "Chagne Password" });

export const postChangePassword = async(req, res) => {
    const {
        body : {oldPassword, newPassword, newPassword1}
    } = req;
    try {
        if(newPassword !== newPassword1) {
            req.flash("error", "Passwords don't match");
            res.status(400);
            res.redirect(`/users${routes.changePassword}`);
            return;
        }
        await req.user.changePassword(oldPassword, newPassword);
        res.redirect(routes.me);
    }catch(error) {
        req.flash("error", "Can't Change Password");
        res.status(400);
        res.redirect(`/users${routes.changePassword}`);
    }
};

