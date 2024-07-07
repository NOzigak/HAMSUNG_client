// 부모 게시물의 id(boardId)를 댓글에서 참조한다는 가정하에 crud를 구현.
// 특정 게시물의 댓글 리스트를 받아온다고 가정
const initialState = [
    {
        id: "1",
        boardId: "1",
        username: "사용자2",
        text: "처음 댓글",
        insertDate: "2024.05.13 12:45",
        replies: [
            {
                id: "1-1",
                username: "사용자1",
                text: "처음 댓글의 첫 번째 댓글",
                insertDate: "2024.05.13 22:32",
                parentId: "1",
            }
        ]
    },
    {
        id: "3",
        boardId: "3",
        username: "사용자3",
        text: "두 번째 댓글",
        insertDate: "2024.05.14 12:30",
        replies: [
            {
                id: "3-1",
                username: "사용자4",
                text: "두 번째 댓글의 첫 번째 댓글",
                insertDate: "2024.05.13 22:55",
                parentId: "3",
            }
        ]
    }
];


const CommentReducer = (state = initialState, action) => {
    switch (action.type) {
      case "ADD_COMMENT":
        return [...state, action.payload];
      case "ADD_REPLY":
        return state.map(comment => {
          if (comment.id === action.payload.parentId) {
            return {
              ...comment,
              replies: [...comment.replies, action.payload]
            };
          }
          return comment;
        });
      case "EDIT_COMMENT":
        return state.map(comment =>
          comment.id === action.payload.id
            ? { ...comment, text: action.payload.newText }
            : comment
        );
      case "EDIT_REPLY":
        return state.map(comment => {
          if (comment.id === action.payload.parentId) {
            return {
              ...comment,
              replies: comment.replies.map(reply =>
                reply.id === action.payload.replyId
                  ? { ...reply, text: action.payload.newText }
                  : reply
              )
            };
          }
          return comment;
        });
      case "DELETE_COMMENT":
        return state.filter(comment => comment.id !== action.payload.id);
      case "DELETE_REPLY":
        return state.map(comment => {
          if (comment.id === action.payload.parentId) {
            return {
              ...comment,
              replies: comment.replies.filter(reply => reply.id !== action.payload.id)
            };
          }
          return comment;
        });
      default:
        return state;
    }
  };
export default CommentReducer;