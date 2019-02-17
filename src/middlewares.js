import multer from "multer";
import routes from "./routes";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
    accessKeyId:process.env.AWS_KEY,
    secretAccessKey:process.env.AWS_PRIVATE_KEY,
    region: "ap-northeast-3"
});

const multerVideo = multer({
    storage: multerS3({
        s3,
        acl: "public-read",
        bucket: "kohubitube/video"
    })
});
const multerAvatar = multer({
    storage: multerS3({
        s3,
        acl: "public-read",
        bucket: "kohubitube/avatar"
    })
});

export const uploadVideo = multerVideo.single("videoFile");
export const uploadAvatar = multerAvatar.single("avatar");

export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = "WeTube";
    res.locals.routes = routes;
    // passport가 사용자를 로그인시킬때 쿠키나 serialize, deserialize등의 기능을 다지원해줌은 물론
    // user가 담긴 object를 요청(request)에도 올려기 때문에 req.user로 해야 우리 template들이 이 user에 접근 가능하게 할 수 있다.
    // user가 존재하거나, 아니면 존재하지 않다면 비어있는 obejct를 주도록
    res.locals.loggedUser= req.user || null;
    next();
};

export const onlyPublic = (req, res, next) => {
    if(req.user) {
        res.redirect(routes.home);
    } else {
        next();
    }
}

export const onlyPrivate = (req, res, next) => {
    if(req.user){
        next();
    } else {
        res.redirect(routes.home);
    }
}
