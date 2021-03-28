import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { loadCotnacts } from '../actions/ContactAction';

import Login from '../cmps/Login';
import ContactList from '../cmps/ContactList';

const HomePage = (props) => {
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const { loggedInUser } = state.user;
    const { contacts } = state.contact;


    useEffect(() => {
        const getContacts = async () => {
            await dispatch(loadCotnacts(loggedInUser['Id']))
        }
        if (loggedInUser) getContacts();
    }, [loggedInUser, dispatch])

    const onfilter = async (ev) => {
        await dispatch(loadCotnacts(loggedInUser['Id'], ev.target.value))
    }
    return (
        <div className="home-page">
            {loggedInUser ? (
                <div className="user-logged">
                    <section className="filter">
                        <label>Search</label>
                        <input type="text" onChange={(ev => onfilter(ev))} />
                    </section>
                    <Link to={`/EditContact`} className="add-contact-btn buttons">
                        <span className="text">Add Contact</span>
                    </Link>
                    { (contacts) ? <ContactList contacts={contacts} userId={loggedInUser['Id']} /> : ''}
                </div>
            ) : <Login />
            }
        </div >
    )
}

export default HomePage;