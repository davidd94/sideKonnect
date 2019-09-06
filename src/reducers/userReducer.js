

const userReducer = (state={
    user: {
        firstname: undefined,
        lastname: undefined,
        email: undefined,
        status: false,
        token: undefined
    },
    fetching: false,
    fetched: false,
    error: null
}, action) => {
    switch(action.type) {
        case "FETCH_USER": {
            return {...state, fetching: true}
        }
        case "FETCH_USER_REJECTED":
            return {...state, fetching: false, error: action.payload}
        case "FETCH_USER_COMPLETE":
            return {...state, fetching: false, fetched: true, user: action.payload}
        case "CHANGE_FIRSTNAME": {
            state = {...state.user, firstname: action.payload}
            break;
        }
        case "CHANGE_LASTNAME": {
            state = {...state.user, lastname: action.payload}
            break;
        }
        case "CHANGE_EMAIL": {
            state = {...state.user, email: action.payload}
            break;
        }
    }
    return state;
};


export { userReducer };