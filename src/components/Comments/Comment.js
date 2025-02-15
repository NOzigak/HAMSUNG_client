import { useState } from "react";
import BoardBtn from "../BoardBtn/BoardBtn";
import "./Comment.css";
import { addReplyRequest, deleteCommentRequest, deleteReplyRequest} from "../../api/CommentAPI";
import getUserInfo from "../../utils/get-userInfo";



const Comment = ({comment, replies, boardId, onClick}) => {

    const [activeComment, setActiveComment] = useState(null); // {type : "editing" id: "1"}
    const [text, setText] = useState();
    const isReplying = activeComment &&
        activeComment.type === "replying" &&
        activeComment.id === comment.id;
    const userInfo = getUserInfo();

    const handleText = (e) => {
        setText(e.target.value);
    }
    
    const onReply = () => {
        setActiveComment({type : "replying", id: comment.id});
        if(isReplying){
            setActiveComment({type : "", id:""});
        }
    };

    // 대댓글 작성
    const replySubmit = async () => {

        const replyDetail = {
            text: text,
            userId: userInfo.user_id,
            username: userInfo.username,
        }
        
        try {
            const response = await addReplyRequest(comment.id, replyDetail);
            console.log("reply added:", response);
            setActiveComment({type:"", id:""});
            onClick(boardId);
        } catch (error) {
            console.log("대댓글 작성에 실패했습니다.", error);
            console.log("대댓글의 부모 댓글 아이디는 : ", comment.id);
        }
        

    }

    const commentDelete = async () => {
        try{
            if (comment.parent_id){
                const response = deleteReplyRequest(comment.id);
                console.log("대댓글 삭제 성공", response);
            } else if (!comment.parent_id){
                const response = deleteCommentRequest(comment.id);
                console.log("댓글 삭제 성공", response);
                console.log(comment.recruit_id);
            }
            window.location.reload();
            
        } catch (error) {
            console.log("댓글 삭제에 실패", error);
        }

    }

    return (
        <div className="commentWrapper">
            <div>
                <p>{comment.username}</p>
                <p>{comment.text}</p>
                <p className="insertDate">{new Date(comment.modifiedDate).toLocaleString()}</p>                
            </div>
            <div className="replyBtn">
                {!comment.parent_id && <BoardBtn title="답글" onClick={onReply}/>}
                {comment.username === userInfo.username && <BoardBtn title="삭제하기" onClick={commentDelete}/>} {/*1108을 유저 토큰 정보로 바꿀예정*/}
            </div>
            {isReplying && (
                <div className="commentUpload">
                    <textarea className="commentInput" onChange={handleText}></textarea>
                    <BoardBtn title="등록하기" onClick={replySubmit}/>                     
                </div>
            )}
            {replies.length > 0 && (
                <div className="replies">
                    {replies.map(reply => (
                        <div className="replyWrapper" key={reply.id ? `${reply.id}-${reply.parent_id}` : Math.random().toString()}>
                            <Comment key={reply.id} comment={reply} replies={[]}/>                            
                        </div>

                    ))}
                </div>
            )}
        </div>
    )
};

export default Comment;