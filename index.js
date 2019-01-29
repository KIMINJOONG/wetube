import express from "express";
//const express = require('express'); 최신자바스크립트로 import로 변경
const app = express();

const PORT = 4000;

const handleListening = () => console.log(`Listening on: http://localhost:${PORT}`);

const handleHome = (req, res) => res.send('Hello from home');

const handleProfile = (req, res) => res.send("You are on my profile");

const betweenHome = (req, res, next) => {
    console.log("Between");
    next();
}

// 접속이 있을때 위에서부터 아래로 실행됨
// 원하는 만큼 middleware를 선언후 route를 실행
// 
app.use(betweenHome);

app.get("/",betweenHome, handleHome);

app.get("/profile", handleProfile);

// app에게 4000포트를 리슨하라고 한다.
// 리스닝을 시작할때 handleListening함수를 실행한다
app.listen(PORT, handleListening);