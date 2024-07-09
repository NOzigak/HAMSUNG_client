import "./Comments.css";
import Comment from "./Comment";
import { useDispatch, useSelector } from "react-redux";
import getReplies from "../../utils/getReplies";
import { addComment } from "../../actions/commentActions";
import CommentForm from "./CommentForm";
import { useEffect, useState } from "react";
import { addCommentRequest, getCommentsRequest } from "../../api/CommentAPI";
import getUserInfo from "../../utils/get-userInfo";
import { useNavigate } from "react-router-dom";

const Comments = ({boardId}) => {
    //const [comments, setComments] = useState([]);
    //const userInfo = getUserInfo()
    //const nav = useNavigate();
    const comments = useSelector(state => state.comments);

    // useEffect(()=> {
    //     fetchComments(boardId);
    // }, [boardId]);

    const dispatch = useDispatch();

    const submitComment = async (boardId, text) => {
        dispatch(addComment(boardId, text));
        // const commentDetail = {
        //     text: text,
        //     user_id: userInfo.id
        // }
        // try{
        //     const response = await addCommentRequest(boardId, commentDetail);
        //     console.log("댓글 작성 성공", response);
        //     nav(`/viewBoard/${boardId}`)      
        // } catch (error) {
        //     console.log("댓글 작성 실패", error);
        // }

    }

    // const fetchComments = async (boardId) => {
    //     try{
    //         const response = await getCommentsRequest(boardId);
    //         setComments(response);
    //     } catch (error) {
    //         console.log("댓글을 불러오는데 실패했습니다.", error);
    //     }
    // }


    return (
        <div className="commentWrapper">
            {comments.map(rootComment => (
                <div key={`${rootComment.board_id}-${rootComment.id}`}>
                    <Comment 
                        comment={rootComment} 
                        replies={getReplies(comments, rootComment.id)}
                        onSubmit={submitComment}
                        boardId={boardId}
                    />                                   
                </div>
            ))}
            <CommentForm onSubmit={submitComment} id={boardId}/>
        </div>
    )
}

export default Comments;