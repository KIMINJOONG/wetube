const recorderContainer = document.getElementById("jsRecordContainer");
const recordBtn = document.getElementById("jsRecordBtn");
const videoPreview = document.getElementById("jsVideoPreview");

const startRecording = async() => {
    try{
        // await하는 이유? 유저가 결정할때까지 기다림
        // 우리가 media에 접근 할 수 있게 해줄지 아닐지
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: { width: 1280, height: 720 }
        });
        videoPreview.srcObject = stream;
        videoPreview.muted = true;
        videoPreview.play();
    }catch(error) {
        recordBtn.innerHTML = ":( Cant record";
        recordBtn.removeEventListener("click", startRecording);
    }
}

function init() {
    recordBtn.addEventListener("click", startRecording);
}

if(recorderContainer) {
    init();
}