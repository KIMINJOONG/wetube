import multer from "multer";
import routes from "./routes";

const multerVideo = multer({dest: "uploads/videos/"});

export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = "WeTube";
    res.locals.routes = routes;
    // passport가 사용자를 로그인시킬때 쿠키나 serialize, deserialize등의 기능을 다지원해줌은 물론
    // user가 담긴 object를 요청(request)에도 올려기 때문에 req.user로 해야 우리 template들이 이 user에 접근 가능하게 할 수 있다.
    // user가 존재하거나, 아니면 존재하지 않다면 비어있는 obejct를 주도록
    res.locals.user= req.user || null;
    next();
};


export const uploadVideo = multerVideo.single("videoFile");