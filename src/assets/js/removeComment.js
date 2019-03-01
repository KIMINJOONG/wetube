import axios from "axios";
const removeCommentUl = document.getElementById("jsCommentList");

const removeComment = async(event) => {
    if(event.srcElement.tagName === "BUTTON") {
        const videoId = window.location.href.split("/videos/")[1];
        const commentId = event.target.value;
        const response = await axios({
            url: `/api/${videoId}/removeComment`,
            method: "POST",
            data: {
                commentId
            }
        });
        if(response === 200) {
            console.log("전달 성공");
        }
    }
};

function init() {
    removeCommentUl.addEventListener("click", removeComment);
}

if(removeCommentUl) {
    init();
}
