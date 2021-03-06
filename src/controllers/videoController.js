import routes from "../routes";
import Video from "../models/Video";
import Comment from "../models/Comment";
import User from "../models/User";

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
        file : { location }
    } = req;
    const newVideo = await Video.create({
        fileUrl: location,
        title,
        description,
        creator : req.user.id
    });

    // To Do: Upload and save video
    req.user.videos.push(newVideo.id);
    req.user.save();
    res.redirect(routes.videoDetail(newVideo.id));

};

export const videoDetail = async(req, res) => {
    //req.params.id와 같다.
    const {
        params: {id}
    } = req;
    try {
        const video = await Video.findById(id)
            .populate("creator")
            .populate("comments")
            .populate("creator");
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
        if(video.creator === req.user.id) {
            throw Error();
        } else {
            res.render("editVideo", {pageTitle: `Edit ${video.title}`, video });
        }
        
    }catch(error) {
        res.redirect(routes.home);
    }
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
        const video = await Video.findById(id);
        const user = await User.findById({_id : video.creator});
        if(video.creator != req.user.id) {
            throw Error();
        } else {
            await Video.findOneAndRemove({_id:id});
            await user.videos.pull(id);
            user.save();
        }
        
    }catch(error) {
        console.log(error);
    }
    res.redirect(routes.home);
};

// Register Video View

export const postRegisterView = async(req, res) => {
    const {
        params: {id}
    } = req;
    try{
        const video = await Video.findById(id);
        video.views += 1;
        video.save();
        res.status(200);
    }catch(error) {
        res.status(400);
        res.end();
    } finally {
        res.end();
    }
};

// Add Comment
export const postAddComment = async(req,res) => {
    const {
        params : {id},
        body: {comment},
        user
    } = req;
    try {
        const video = await Video.findById(id);
        const newComment = await Comment.create({
            text: comment,
            creator: user.id
        });
        video.comments.push(newComment.id);
        video.save();

    }catch(error) {
        res.status(400);
    }finally {
        res.end();
    }
};

export const postRemoveCommnet = async(req,res) => {
    const {
        params: {id},
        body: {commentId},
        user
    } = req;
    try{
        const video = await Video.findById(id);
        const comment = await Comment.findOne({ _id: commentId});
        if(String(comment.creator) === user.id) {
            await Comment.findOneAndRemove({_id: commentId});
            // video안에 comments objectId배열중 해당 코멘트아이디배열을 삭제!
            video.comments.pull(commentId);
            video.save();
        } else {
            throw Error();
        }
    }catch(error){
        res.status(400);
    }finally{
        res.end();
    }
};