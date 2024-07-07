import { combineReducers } from "redux";
import BoardReducer from "./BoardReducer";
import CommentReducer from "./CommentReducer";
import NoticeReducer from "./NoticeReducer";
import AuthReducer from "./AuthReducer";
import BoardsReducer from "./BoardsReducer";


const RootReducer = combineReducers({
    boards : BoardReducer,
    comments : CommentReducer,
    notice : NoticeReducer,
    auth: AuthReducer,
    board: BoardsReducer,

})

export default RootReducer;