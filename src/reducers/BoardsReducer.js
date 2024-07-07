const initialState = {
    boards: [],
    loading: false,
    error: null,
};

const BoardsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_BOARD_REQUEST":
        case "CREATE_BOARD_REQUEST":
        case "UPDATE_BOARD_REQUEST":
        case "DELETE_BOARD_REQUEST":
            return {
                ...state,
                loading: true,
                error: null,
            };
        case "GET_BOARD_SUCCESS":
            return {
                ...state,
                boards: action.payload,
                loading: false,
                error: null,
            }
        case "CREATE_BOARD_SUCCESS":
            return {
                ...state,
                boards: [...state.boards, action.payload],
                loading: false,
                error: null,
            }
        case "UPDATE_BOARD_SUCCESS":
            const updateIndex = state.boards.findIndex(board => board.id === action.payload.id);
            if (updateIndex !== -1){
                const updatedBoards = [...state.boards];
                updatedBoards[updateIndex] = {...updatedBoards[updateIndex], ...action.payload.updatedData};
                return {
                    ...state,
                    boards: updatedBoards,
                    loading: false,
                    error: null,
                }
            }
        
        case "DELETE_BOARD_SUCCESS":
            return  {
                ...state,
                boards: state.boards.filter(board => board.id !== action.payload),
                loading: false,
                error: null,
            };
        case "GET_BOARD_FAILURE":
        case "CREATE_BOARD_FAILURE":
        case "UPDATE_BOARD_FAILURE":
        case "DELETE_BOARD_FAILURE":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default BoardsReducer;