const contactService = require('./contact.service');

const getContacts = async (request, response) => {
    console.log("getContacts request:", request)
    const userId = request.query.userId;
    const filterBy = request.query.filterBy;
    contactService.getContacts(userId, filterBy).then(result => {
        response.status(200).json(result)
    })
}

const getContactById = async (request, response) => {
    contactService.getContactById(request.query.userId, request.params.id).then(result => {
        response.status(200).json(result)
    })
}

const addContact = async (request, response) => {
    let contact = { ...request.body };
    contactService.addContact(contact).then(result => {
        response.status(201).json(result);
    })
}

const updateContact = async (request, response) => {
    let userId = request.body.params.userId;
    let contact = { ...request.body.params.contact };
    contactService.updateContact(userId, contact).then(result => {
        response.status(200).json(result);
    })
}

const deleteContact = async (request, response) => {
    let contactId = request.params.id;
    contactService.deleteContact(contactId).then(result => {
        response.status(200).json(result);
    })
}

const testPlease = async (request, response) => {
    console.log("reutttt")
    response.send('reutttt')
}
module.exports = {
    getContacts,
    getContactById,
    addContact,
    updateContact,
    deleteContact,
    testPlease
}