import { LOGIN_NOT_VALID } from "./actionTypes";

const loginReducer = (state = {}, action = {}) => {
    switch (action.type) {
        case LOGIN_NOT_VALID:
            return {
                fields: action.payload
            };
        default:
            return state;
    }
};

export default loginReducer;
