import axios from 'axios';
const baseUrl = 'https://contact-manegment.herokuapp.com/api/contact/';
// const baseUrl = 'http://localhost:8000/api/contact/';


const getContacts = async (userId, filterBy) => {
  const credentials = { userId, filterBy }
  return await axios.get(`${baseUrl}`, { params: credentials })
    .then(res => {
      return res.data;
    })
}

const getContactById = async (userId, id) => {
  const credentials = { userId }
  return await axios.get(`${baseUrl}/${id}`, { params: credentials })
    .then(res => {
      return res.data;
    })
}

const deleteContact = async (contactId) => {
  return await axios.delete(`${baseUrl}/${contactId}`)
    .then(res => {
      return res.data[0]
    })
}

const _updateContact = async (userId, contact) => {
  const credentials = { userId, contact }
  return await axios.put(`${baseUrl}/${contact['Id']}`, { params: credentials })
    .then(res => {
      return res.data;
    })
}

const _addContcat = async (userId, contact) => {
  return await axios.post(`${baseUrl}`, contact)
    .then(res => {
      return res.data;
    })
}

function saveContact(userId, contact) {
  return (contact['Id'] ? _updateContact(userId, contact) : _addContcat(userId, contact));
}

const contactService = {
  getContacts,
  getContactById,
  deleteContact,
  saveContact,
}
export default contactService;


