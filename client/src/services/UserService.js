import axios from 'axios';

const baseUrl = 'https://contact-manager-rotem.herokuapp.com/api/user/';


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
    console.log("credentials:", credentials)
    const currUser = _checkIsUserLoggedin();
    if (currUser) {
        console.log("currUser:", currUser)
        return currUser
    } else {
        console.log("no currUser:", currUser)
        const user = await axios.post(`${baseUrl}login`, credentials)
            .then(res => {
                console.log("res on service:", res);
                if (res.data['Id']) localStorage.setItem('logged user', JSON.stringify(res.data));
                return res.data
            }).catch((error) => {
                console.log("cant login:", error)
            })
        console.log("user:", user)
        // if (user['Id']) localStorage.setItem('logged user', JSON.stringify(user));
        return JSON.parse(localStorage.getItem('logged user'));
    }
}

const _checkIsUserLoggedin = () => {
    return JSON.parse(localStorage.getItem('logged user'));
}





