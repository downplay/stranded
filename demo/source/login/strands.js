import yup from "yup";

import { strand, transit, dispatch } from "stranded";
import { loginWasInvalid, loginFailed, userLoggedIn } from "./actions";
import * as api from "./api";

// Define a yup schema to validate the login
const loginSchema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required()
});

// Validator atom
const validateLogin = async (username, password) => {
    try {
        const valid = await loginSchema.validate({ username, password });
        return { valid };
    } catch (error) {
        return {
            valid: false,
            invalidFields: {
                [error.path]: error.errors
            }
        };
    }
};

const callLoginService = async (username, password) => {
    try {
        // Call the fake API
        const result = await api.login();
        return { authorized: true, profile: result };
    } catch (e) {
        // Wrong user
        return { authorized: false };
    }
};

const loginWithCredentials = (username, password) =>
    strand(
        () => callLoginService(username, password),
        ({ authorized, profile }) =>
            dispatch(authorized ? userLoggedIn(profile) : loginFailed())
    );

export const login = (username, password) =>
    strand(
        // Validate username and password
        () => validateLogin(username, password),
        // Is it valid? Branch to next strand or dispatch
        ({ valid, invalidFields }) =>
            valid
                ? loginWithCredentials(username, password)
                : dispatch(loginWasInvalid(...invalidFields))
    );

export const Login = Symbol("Login");

export const LOGIN_PAGE = "LOGIN_PAGE";

export const loginProcess = () =>
    strand(Login)(
        transit({ page: LOGIN_PAGE }),
        pause(LoginForm), // wait?
        { username, password }
    );
