const initialState = {
    Notice: [],
    loading: false,
    error: null,
};

const NoticeReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_NOTICE_REQUEST":
        case "CREATE_NOTICE_REQUEST":
        case "UPDATE_NOTICE_REQUEST":
        case "DELETE_NOTICE_REQUEST":
            return {
                ...state,
                loading: true,
                error: null,
            };
        case "GET_NOTICE_SUCCESS":
            return {
                ...state,
                Notice: action.payload,
                loading: false,
                error: null,
            }
        case "CREATE_NOTICE_SUCCESS":
            return {
                ...state,
                Notice: [...state.Notice, action.payload],
                loading: false,
                error: null,
            }
        
        case "DELETE_NOTICE_SUCCESS":
            return  {
                ...state,
                Notice: state.Notice.filter(Notice => Notice.id !== action.payload),
                loading: false,
                error: null,
            };
        case "GET_NOTICE_FAILURE":
        case "CREATE_NOTICE_FAILURE":
        case "DELETE_NOTICE_FAILURE":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default NoticeReducer;