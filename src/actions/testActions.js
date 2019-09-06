

const incrementNum = (number) => {
    return {
        type: "INC",
        payload: number
    };
};


const decrementNum = (number) => {
    return {
        type: "DEC",
        payload: number
    };
};