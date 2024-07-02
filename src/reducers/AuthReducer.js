const initialState = {
    loading: false,
    error: null,
    isAuthenticate: false,
    user: null // accessToken, refreshToken 저장(response.data)
}

const AuthReducer = (state = initialState, action) => {
    switch(action.type){
        case 'LOGIN_REQUEST':
        case 'SIGNUP_REQUEST':
            return {
                ...state,
                loading: true,
                error: null
            };
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                loading: false,
                isAuthenticate: true,
                user: action.payload
            };
        case 'SIGNUP_SUCCESS':
            return{
                ...state,
                loading: false,
                isAuthenticate: true,
            }
        case 'LOGIN_FAILURE':
        case 'SIGNUP_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
                isAuthenticate: false,
                user: null
            }
        default:
            return state;
    }
}

export default AuthReducer;