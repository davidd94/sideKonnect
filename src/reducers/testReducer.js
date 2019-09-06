

export default function reducer(state={
    number: 0
}, action) {
    if (action.type === 'INC') {
        return state.number + action.payload;
    }
    return state.number;
};