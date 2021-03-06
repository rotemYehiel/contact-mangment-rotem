import UserService from '../services/UserService';

export function loadUser(userCredentials = null) {
    return async dispatch => {
        const loggedInUser = await UserService.getUser(userCredentials);
        if (loggedInUser) {
            dispatch({ type: 'SET_USER', loggedInUser });
        }
        return loggedInUser;
    }

}
export function logOut() {
    return dispatch => {
        UserService.logOut();
        dispatch({ type: 'SET_USER', loggedInUser: null })
    }
}
export function signUp(newUser) {
    return async () => {
        const res = await UserService.signUp(newUser);
        if (res) {
            const numOfChanges = res.rowsAffected;
            // const id = res.id;
            return numOfChanges;
        } else {
            return 'can not signup...'
        }
    }
}