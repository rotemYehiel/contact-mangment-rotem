import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { saveContact, loadContact } from '../actions/ContactAction';
import GoogleMapsService from '../services/GoogleMapsService';

const EditContact = (props) => {
    const currUser = useSelector(state => state.user.loggedInUser);
    const dispatch = useDispatch();
    const [inputAddress, setInputAddress] = useState({
        'Street': '',
        'City': '',
        'State': '',
        'Postal Code': ''
    });
    const [inputName, setInputName] = useState({ 'FirstName': '', 'LastName': '' });
    const [contact, setContact] = useState({
        'Id': '',
        'ContactName': '',
        'Phone': '',
        'Email': '',
        'Address': '',
        'UserId': ''

    });
    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    };


    useEffect(() => {
        const id = props.match.params.id;
        const getContact = async () => {
            const currContact = await dispatch(loadContact(currUser['Id'], id));
            setContact(currContact);
            setInputName(currContact['ContactName']);
            setInputAddress(currContact['Address']);
        }

        if (id && currUser) getContact();
    }, [props.match.params.id, currUser, dispatch])

    const onSaveNewContact = async (ev) => {
        ev.preventDefault();
        const addressStr = GoogleMapsService.createAddressStr(inputAddress);
        const validAddress = await GoogleMapsService.geoCode(addressStr);
        contact['UserId'] = currUser['Id'];
        contact['ContactName'] = inputName;
        contact['Address'] = validAddress;
        saveNewContact();
    }

    const saveNewContact = async () => {
        const numOfChanges = await dispatch(saveContact(currUser['Id'], contact));
        if (!numOfChanges) {
            setTimeout(() => {
                alert('something goes wrong...')
            }, 2000);
        } else {
            resetForm();
            alert(`number Of Changes is ${numOfChanges}`);
            props.history.push('/');
        }
    }

    const handleChange = (ev) => {
        ev.preventDefault();
        const { name, value } = ev.target;
        if (name === 'Street' || name === 'City' || name === 'State' || name === 'Postal Code') {
            setInputAddress({
                ...inputAddress,
                [name]: value
            })
        } else if (name === 'FirstName' || name === 'LastName') {
            setInputName({
                ...inputName,
                [name]: value
            })
        } else {
            setContact({
                ...contact,
                [name]: value
            })
        }
    }

    const resetForm = () => {

    }

    if (contact) {
        return (
            <div className="contact-edit-page">
                {contact['Id'] ?
                    (<h1 className="page-header">Edit Contact</h1>)
                    : (<h1 className="page-header">Add new contact</h1>)}
                <form onSubmit={(ev) => onSaveNewContact(ev)} style={formStyle}>
                    <label>Enter a contact First name: </label>
                    <input
                        type="text"
                        placeholder="Contact First Name"
                        name="FirstName"
                        value={inputName['FirstName']}
                        onChange={(ev) => handleChange(ev)}
                    />
                    <label>Enter a contact Last name: </label>
                    <input
                        type="text"
                        placeholder="Contact Last Name"
                        name="LastName"
                        value={inputName['LastName']}
                        onChange={(ev) => handleChange(ev)}
                    />
                    <label>Enter phone number: </label>
                    <input
                        type="tel"
                        placeholder="Phone number"
                        name="Phone"
                        value={contact['Phone']}
                        onChange={(ev) => handleChange(ev)}
                    />
                    <label>Enter email: </label>
                    <input
                        type="email"
                        placeholder="Contact email"
                        name="Email"
                        value={contact['Email']}
                        onChange={(ev) => handleChange(ev)}
                    />
                    <label>Street:</label>
                    <input className="street-input" type="text" name="Street" value={inputAddress['Street']} onChange={(ev) => handleChange(ev)} />
                    <label>City:</label>
                    <input className="city-input" type="text" name="City" value={inputAddress['City']} onChange={(ev) => handleChange(ev)} />
                    <label>State:</label>
                    <input className="state-input" type="text" name="State" value={inputAddress['State']} onChange={(ev) => handleChange(ev)} />
                    <label>Postal Code:</label>
                    <input className="postalCode-input" type="text" name="Postal Code" value={inputAddress['Postal Code']} onChange={(ev) => handleChange(ev)} />
                    <button>Save</button>
                </form>
            </div>
        )
    } else {
        return (<div>no contact yet...</div>)
    }

}

export default EditContact;