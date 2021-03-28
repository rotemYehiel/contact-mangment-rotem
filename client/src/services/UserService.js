import axios from 'axios';
// const baseUrl = (process.env.NODE_ENV !== 'development') ?
//     'https://contact-manager-rotem.herokuapp.com/api/user/' :
//     '//localhost:8090/api/user/';
const baseUrl = 'https://contact-manager-rotem.herokuapp.com/api/user/';

const getUser = (credentials) => {
    const user = JSON.parse(localStorage.getItem('logged user'));
    return (credentials) ? _login(credentials) : user;
}

const logOut = () => {
    localStorage.removeItem('logged user');
}
const userService = {
    getUser,
    logOut
}
export default userService;

const _login = async (credentials) => {
    const currUser = checkIsUserLoggedin();
    if (currUser) {
        return currUser
    } else {
        const user = await axios.post(`${baseUrl}`, credentials)
            .then(res => {
                return res.data
            }).catch((error) => {
                console.log("cant login:", error)
            })
        if (user['Id']) localStorage.setItem('logged user', JSON.stringify(user));
        return JSON.parse(localStorage.getItem('logged user'));
    }
}

const checkIsUserLoggedin = () => {
    return JSON.parse(localStorage.getItem('logged user'));
}





