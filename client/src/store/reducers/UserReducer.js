const initialState = {
    loggedInUser: null
}
export default function UserReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                loggedInUser: (action.loggedInUser) ? action.loggedInUser : null
            }
        default:
            return state;
    }
};
