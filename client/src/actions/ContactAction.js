import ContactService from '../services/ContactService'

export function loadCotnacts(userId, filterBy = null) {
    return async dispatch => {
        const contacts = await ContactService.getContacts(userId, filterBy);
        dispatch({ type: 'SET_CONTACTS', contacts })
        return contacts
    }
}

export function loadContact(userId, id) {
    return async dispatch => {
        const contact = await ContactService.getContactById(userId, id);
        dispatch({ type: 'SET_CONTACT', contact });
        return contact;
    }

}

export function saveContact(userId, contact) {
    return async dispatch => {
        let isUpdate = false;
        (contact['Id']) ? isUpdate = true : isUpdate = false;
        const res = await ContactService.saveContact(userId, contact);
        const numOfChanges = res.rowsAffected;
        if (isUpdate) {
            dispatch({ type: 'UPDATE_CONTACT', contact })
        }
        else {
            contact['Id'] = res.id;
            dispatch({ type: 'ADD_CONTACT', contact })
        }
        return numOfChanges;
    }
}
export function deleteContact(id) {
    return async dispatch => {
        const numOfChanges = await ContactService.deleteContact(id);
        dispatch({ type: 'DELETE_CONTACT', id })
        return numOfChanges;
    }
}

export function clearContact() {
    return async dispatch => {
        dispatch({ type: 'SET_CONTACT', contact: null })
    }
}