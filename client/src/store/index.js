import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk'

import UserReducer from './reducers/UserReducer';
import ContactReducer from './reducers/ContactReducer';

const store = createStore(combineReducers({
    user: UserReducer,
    contact: ContactReducer
}), applyMiddleware(thunk));


export default store