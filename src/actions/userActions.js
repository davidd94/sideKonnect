

const fetchUser = () => {
    return {
        type: "FETCH_USER",
        payload: {
            firstname: "DENNIS",
            lastname: "DUONG",
            email: "TEST@GG.COM"
        }
    };
};

const setUserFirstname = (firstname) => {
    return {
        type: 'CHANGE_FIRSTNAME',
        payload: firstname,
    }
};

const setUserLastname = (lastname) => {
    return {
        type: 'CHANGE_LASTNAME',
        payload: lastname,
    }
};

const setUserEmail = (email) => {
    return {
        type: 'CHANGE_EMAIL',
        payload: email,
    }
};


export { fetchUser, setUserFirstname, setUserLastname, setUserEmail };