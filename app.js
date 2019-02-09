import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import { localsMiddleware } from "./middlewares";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";

import "./passport";

//const express = require('express'); 최신자바스크립트로 import로 변경
const app = express();



// 접속이 있을때 위에서부터 아래로 실행됨
// 원하는 만큼 middleware를 선언후 route를 실행
//
app.use(helmet());
app.set("view engine", "pug");
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); 
app.use(morgan("dev"));
// 이 위치에 passport를 써준 이유
// 위에서 실행된 cookieParser로 부터 쿠키가 쭉 여기까지 내려와서
// passport는 초기화(initialize)되고
// 그다음엔 passport가 제 스스로 쿠키를 들여다봐서, 그 쿠키 정보에 해당하는 사용자를 찾아줌.
// 그리고 passport는 자기가 찾은 그 사용자를 요청(request)의 object, 즉 req.user로 만들어줌!
app.use(passport.initialize());
app.use(passport.session());
app.use(localsMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

// app에게 4000포트를 리슨하라고 한다.
// 리스닝을 시작할때 handleListening함수를 실행한다

export default app;