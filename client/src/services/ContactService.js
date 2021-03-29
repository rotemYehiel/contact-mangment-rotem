import axios from 'axios';
// const baseUrl = (process.env.NODE_ENV !== 'development') ?
//   'https://contact-manager-rotem.herokuapp.com/api/contact/' :
//   '//localhost:8090/api/contact/';

// const baseUrl = 'https://contact-manager-rotem.herokuapp.com/api/contact/';

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

function getEmptyContact() {
  return {
    _id: _makeId(),
    name: '',
    email: '',
    phone: ''
  }
}

const contactService = {
  getContacts,
  getContactById,
  deleteContact,
  saveContact,
  getEmptyContact
}
export default contactService;
function _makeId(length = 10) {
  let txt = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return txt
}

