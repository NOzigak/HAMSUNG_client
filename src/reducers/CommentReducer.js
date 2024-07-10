// 부모 게시물의 id(boardId)를 댓글에서 참조한다는 가정하에 crud를 구현.
// 특정 게시물의 댓글 리스트를 받아온다고 가정
const initialState = [
    {
        id: "1",
        recruit_id: "1",
        username: "사용자123",
        text: "처음 댓글",
        modifiedDate: "2024.05.13 12:45",
        childs: [
            {
                parent_id: "1",              
                id: "1-1",
                username: "사용자1",
                text: "처음 댓글의 첫 번째 댓글",
                modifiedDate: "2024.05.13 22:32",
            }
        ]
    },
    {
        id: "3",
        recruit_id: "3",
        username: "사용자3",
        text: "두 번째 댓글",
        modifiedDate: "2024.05.14 12:30",
        childs: [
            {
                parent_id: "3",
                id: "3-1",
                username: "사용자4",
                text: "두 번째 댓글의 첫 번째 댓글",
                modifiedDate: "2024.05.13 22:55",

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
          if (comment.id === action.payload.parent_id) {
            return {
              ...comment,
              childs: [...comment.childs, action.payload]
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
          if (comment.id === action.payload.parent_id) {
            return {
              ...comment,
              childs: comment.childs.map(reply =>
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
          if (comment.id === action.payload.parent_id) {
            return {
              ...comment,
              childs: comment.childs.filter(reply => reply.id !== action.payload.id)
            };
          }
          return comment;
        });
      default:
        return state;
    }
  };
export default CommentReducer;