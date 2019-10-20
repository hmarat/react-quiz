import axios from "axios"
import { AUTH_SUCCESS, AUTH_LOGOUT } from "./actionTypes"

export function auth(email, password, isLogin) {
    return async dispatch => {
        const authData = {
            email,
            password,
            returnSecureToken: true
        }

        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCR6XVI_5wH5fn4NcjA63kVMFqZsZcityE"

        if (!isLogin)
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCR6XVI_5wH5fn4NcjA63kVMFqZsZcityE"

        const response = await axios.post(url, authData);
        const data = response.data;

        const expiration = new Date(new Date().getTime() + data.expiresIn * 1000)

        localStorage.setItem("token", data.idToken);
        localStorage.setItem("userId", data.localId);
        localStorage.setItem("expirationDate", expiration);

        dispatch(authSuccess(data.idToken));
        autoLogout(data.expiresIn);
    }
}

export function authSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        token
    }
}

export function autoLogout(time) {
    return dispatch => {
        setTimeout(() => dispatch(logout), time * 1000);
    }
}

export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("expirationDate");
    return {
        type: AUTH_LOGOUT
    }
}
