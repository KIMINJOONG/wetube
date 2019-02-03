import { videos } from "../db";

export const home = (req, res) => {
    res.render("home", { pageTitle : "Home", videos});
}
export const search = (req, res) => {
    const { 
        query: { term: searchingBy } 
    } = req; // req.query.term과 같다
    res.render("search", {pageTitle: "Search", searchingBy, videos});
};
export const upload = (req, res) => res.render("upload");
export const videoDetail = (req, res) => res.render("videoDetail", { pageTitle: "VideoDetail"});
export const editVideo = (req, res) => res.render("editVideo", { pageTitle: "editVideo"});
export const deleteVideo = (req, res) => res.render("deleteVideo", { pageTitle: "deleteVideo"});

