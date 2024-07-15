import "./Comments.css";
import Comment from "./Comment";
import getReplies from "../../utils/getReplies";
import CommentForm from "./CommentForm";
import { useEffect, useState } from "react";
import { addCommentRequest, getCommentsRequest } from "../../api/CommentAPI";
import getUserInfo from "../../utils/get-userInfo";


const Comments = ({boardId}) => {
    const [comments, setComments] = useState([]);
    const userInfo = getUserInfo()

    useEffect(()=> {
        fetchComments(boardId);
    }, [boardId]);


    const submitComment = async (boardId, text) => {
        const commentDetail = {
            user_id: userInfo.user_id,
            text: text
        }
        try{
            const response = await addCommentRequest(boardId, commentDetail);
            console.log("댓글 작성 성공", response);
            fetchComments(boardId);
        } catch (error) {
            console.log("댓글 작성 실패", error);
        }

    }

    const fetchComments = async (boardId) => {
        try{
            const response = await getCommentsRequest(boardId);
            setComments(response);
        } catch (error) {
            console.log("댓글을 불러오는데 실패했습니다.", error);
        }
    }


    return (
        <div className="commentWrapper">
            {comments.map(rootComment => (
                <div key={`${rootComment.board_id}-${rootComment.id}`}>
                    <Comment 
                        comment={rootComment} 
                        replies={getReplies(comments, rootComment.id)}
                        onSubmit={submitComment}
                        boardId={boardId}
                        onClick={fetchComments}
                    />                                   
                </div>
            ))}
            <CommentForm onSubmit={submitComment} id={boardId}/>
        </div>
    )
}

export default Comments;