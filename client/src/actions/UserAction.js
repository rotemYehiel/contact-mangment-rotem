import UserService from '../services/UserService';

export function loadUser(userCredentials = null) {
    return async dispatch => {
        const loggedInUser = await UserService.getUser(userCredentials);
        dispatch({ type: 'SET_USER', loggedInUser })
    }

}
export function logOut() {
    return dispatch => {
        UserService.logOut();
        dispatch({ type: 'SET_USER', loggedInUser: null })
    }
}
export function signUp(newUser) {
    return async dispatch => {
        const loggedInUser = await UserService.signUp(newUser);
        dispatch({ type: 'SET_USER', loggedInUser })
    }
}