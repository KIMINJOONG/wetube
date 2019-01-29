const express = require('express');
const app = express();

const PORT = 4000;

function handleListening() {
    console.log(`Listening on: http://localhost:${PORT}`);
}


// app에게 4000포트를 리슨하라고 한다.
// 리스닝을 시작할때 handleListening함수를 실행한다
app.listen(PORT, handleListening);