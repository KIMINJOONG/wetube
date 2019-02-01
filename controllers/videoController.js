export const home = (req, res) => res.render("home", { pageTitle : "Home"});
export const search = (req, res) => res.send("Search", { pageTitle: "Search"});
export const videos = (req, res) => res.send("video", { pageTitle: "Video"});
export const upload = (req, res) => res.send("upload", { pageTitle: "Upload"});
export const videoDetail = (req, res) => res.send("videoDetail", { pageTitle: "VideoDetail"});
export const editVideo = (req, res) => res.send("editVideo", { pageTitle: "editVideo"});
export const deleteVideo = (req, res) => res.send("deleteVideo", { pageTitle: "deleteVideo"});

