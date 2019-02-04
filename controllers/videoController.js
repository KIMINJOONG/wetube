import routes from "../routes";
import Video from "../models/Video";


export const home = async(req, res) => {
    //database에 모든 video를 갖고오라는 의미
    try{
        const videos = await Video.find({}); 
        res.render("home", { pageTitle : "Home", videos});
    }catch(error) {
        console.log(error);
        res.render("home", { pageTitle : "Home", videos: []});
    }
}
export const search = (req, res) => {
    const { 
        query: { term: searchingBy } 
    } = req; // req.query.term과 같다
    res.render("search", {pageTitle: "Search", searchingBy, videos});
};
export const getUpload = (req, res) => 
    res.render("upload", { pageTitle: "Upload" });

export const postUpload = async(req, res) => {
    const {
        body: { title, description },
        file : { path }
    } = req;
    const newVideo = await Video.create({
        fileUrl: path,
        title,
        description
    });

    // To Do: Upload and save video
    res.redirect(routes.videoDetail(newVideo.id));

};

export const videoDetail = (req, res) => 
    res.render("videoDetail", { pageTitle: "VideoDetail"});
export const editVideo = (req, res) => res.render("editVideo", { pageTitle: "editVideo"});
export const deleteVideo = (req, res) => res.render("deleteVideo", { pageTitle: "deleteVideo"});

