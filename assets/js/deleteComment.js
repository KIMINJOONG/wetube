import axios from "axios";
const deleteCommnetBtn = document.getElementById("jsDeleteCommentBtn");

const handleDelete = (id) => {
    const videoId = window.location.href.split("/videos/")[1];
    const response = await axios({
        url: `/api/${videoId}/removeComment`,
        method: "POST",
        data: {
            id
        }
    });
};

function init() {
    deleteCommnetBtn.addEventListener("click", handleDelete);
}

if(deleteCommnetBtn) {
    init();
}