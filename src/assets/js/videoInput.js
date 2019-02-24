const videoInput = document.getElementById("file");

const sizeLimit = () => {
    if(videoInput.value != "") {
        let fileSize = videoInput.files[0].size;
        let maxSize = 1 * 1024 * 1024; //1MB

        if(fileSize > maxSize) {
            videoInput.value = "";
            alert("첨부파일은 1MB 이내로 등록 가능합니다");
            return;
        }
    }
};

function init() {
    videoInput.addEventListener("change", sizeLimit);
}
if(videoInput) {
    init();
}