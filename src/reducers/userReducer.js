

const userReducer = (state={
    firstname: (localStorage.getItem('firstname') ? localStorage.getItem('firstname') : undefined),
    lastname: undefined,
    email: undefined,
    status: false,
    token: (localStorage.getItem('token') ? localStorage.getItem('token') : undefined),
    fetching: false,
    fetched: false,
    error: undefined
}, action) => {
    switch(action.type) {
        case "FETCH_USER": {
            return {...state, fetching: true};
        }
        case "FETCH_USER_REJECTED":
            return {...state, fetching: false, error: action.payload};
        case "FETCH_USER_COMPLETE":
            return {...state, fetching: false, fetched: true, user: action.payload};
        case "CHANGE_FIRSTNAME": {
            state = {...state, firstname: action.payload};
            break;
        }
        case "CHANGE_LASTNAME": {
            state = {...state, lastname: action.payload};
            break;
        }
        case "CHANGE_EMAIL": {
            state = {...state, email: action.payload};
            break;
        }
        case "SET_TOKEN": {
            state = {...state, token: action.payload};
            break;
        }
        case "UPDATE_TOKEN": {
            state = {...state, token: action.payload};
            break;
        }
    }
    return state;
};


export { userReducer };