import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";

//const express = require('express'); 최신자바스크립트로 import로 변경
const app = express();


// 접속이 있을때 위에서부터 아래로 실행됨
// 원하는 만큼 middleware를 선언후 route를 실행
//
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); 
app.use(helmet());
app.use(morgan("dev"));

app.use("/", globalRouter);
app.use("/user", userRouter);
app.use("/video", videoRouter);

// app에게 4000포트를 리슨하라고 한다.
// 리스닝을 시작할때 handleListening함수를 실행한다

export default app;