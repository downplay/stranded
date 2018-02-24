import { LOGIN_NOT_VALID } from "./actionTypes";

export const loginNotValid = (...fields) => ({
    type: LOGIN_NOT_VALID,
    payload: fields
});
