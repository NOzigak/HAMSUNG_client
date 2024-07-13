const initialState = {
    loading: false,
    error: null,
    isAuthenticated: false,
    user: null // accessToken 저장(response.data.access)
}

const AuthReducer = (state = initialState, action) => {
    switch(action.type){
        case 'LOGIN_REQUEST':
        case 'SIGNUP_REQUEST':
        case 'LOGOUT_REQUEST':
            return {
                ...state,
                loading: true,
                error: null
            };
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            };
        case 'SIGNUP_SUCCESS':
            return{
                ...state,
                loading: false,
                isAuthenticated: true,
            }
        case 'LOGOUT_SUCCESS':
            return{
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
            }
        case 'LOGIN_FAILURE':
        case 'SIGNUP_FAILURE':
        case 'LOGOUT_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
                isAuthenticated: false,
                user: null
            }
        case 'SET_ACCESS_TOKEN':
            return{
                ...state,
                user: action.payload,
            }
        default:
            return state;
    }
}

export default AuthReducer;