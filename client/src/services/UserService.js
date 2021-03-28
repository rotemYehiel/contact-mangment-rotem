import axios from 'axios';

// const baseUrl = 'https://contact-manager-rotem.herokuapp.com/api/user/';
const baseUrl = 'https://localhost:8000/api/user/';


const getUser = (credentials) => {
    const user = JSON.parse(localStorage.getItem('logged user'));
    return (credentials) ? _login(credentials) : user;
}

const logOut = () => {
    localStorage.removeItem('logged user');
}

const signUp = async (credentials) => {
    return await axios.post(`${baseUrl}addUser`, credentials)
        .then(res => {
            return res.data
        }).catch((error) => {
            console.log("cant sign Up:", error)
        })
}
const userService = {
    getUser,
    logOut,
    signUp
}
export default userService;

const _login = async (credentials) => {
    const currUser = _checkIsUserLoggedin();
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

const _checkIsUserLoggedin = () => {
    return JSON.parse(localStorage.getItem('logged user'));
}





