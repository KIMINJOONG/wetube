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
export const search = async(req, res) => {
    const { 
        query: { term: searchingBy } 
    } = req; // req.query.term과 같다
    let videos = [];
    try{
        videos = await Video.find({
            title: {$regex: searchingBy, $options: "i"}
    });
    }catch(error){
        console.log(error);
    }
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

export const videoDetail = async(req, res) => {
    //req.params.id와 같다.
    const {
        params: {id}
    } = req;
    try {
        const video = await Video.findById(id);
        res.render("videoDetail", { pageTitle: "VideoDetail", video });
    } catch(error) {
        console.log(error);
        res.redirect(routes.home);
    }

};
    
export const getEditVideo = async(req, res) => {
    const {
        params: {id}
    } = req;
    try{
        const video = await Video.findById(id);
        res.render("editVideo", {pageTitle: `Edit ${video.title}`, video });
    }catch(error) {
        res.redirect(routes.home);
    }
    res.render("editVideo", { pageTitle: "editVideo"});
};
export const postEditVideo = async(req, res) => {
    const {
        params: {id}
        , body: {title, description}
    } = req;

    try{
        await Video.findOneAndUpdate({_id: id}, {title, description});
        res.redirect(routes.videoDetail(id));
    }catch(error) {
        res.redirect(rotues.home);
    }

};


export const deleteVideo = async(req, res) => {
    const {
        params: { id}
    } = req;
    try{
        await Video.findOneAndRemove({_id:id});
    }catch(error) {
        console.log(error);
    }
    res.redirect(routes.home);
};

