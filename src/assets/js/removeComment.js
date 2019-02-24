import axios from "axios";
const removeCommentBtn = document.querySelectorAll(".removeCommentBtn");

const removeComment = async(event) => {
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
};

function init() {
    //removeCommentBtn.addEventListener("click", removeComment);
    for(let i = 0; i < removeCommentBtn.length; i++) {
        removeCommentBtn[i].addEventListener("click", removeComment);
    }
}

if(removeCommentBtn) {
    init();
}
