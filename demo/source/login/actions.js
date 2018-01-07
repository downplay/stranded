import { LOGIN_WAS_INVALID } from "./actionTypes";

export const loginWasInvalid = (...fields) => ({
    type: LOGIN_WAS_INVALID,
    payload: fields
});
