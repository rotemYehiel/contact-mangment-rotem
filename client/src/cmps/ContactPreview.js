import moment from 'moment';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteContact } from '../actions/ContactAction';

const ContactPreview = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { contact } = props;

    const removeContact = async (id) => {
        const numOfChanges = await dispatch(deleteContact(id));
        alert(`number Of Changes is ${numOfChanges}`);
    }
    return (
        <div className="contact-preview-cmp">
            <h2 className="contact-name">{contact['ContactName']['FirstName']} {contact['ContactName']['LastName']}</h2>
            <section className="details-sec">
                <p>Phone: {contact['Phone']}</p>
                <p>Email: {contact['Email']}</p>
                <ul>{Object.keys(contact['Address']).map((key, index) => {
                    const currVal = Object.values(contact['Address'])[index];
                    return (<li key={index}>{key}: {(currVal && currVal !== ' ') ? currVal : 'not found'}</li>)
                })}</ul>
                <p className="last-update">Last update at {moment(contact['UpdatedDate']).format('LLL')}</p>
            </section>
            <section className="buttons-sec">
                <button onClick={() => history.push(`/EditContact/${contact['Id']}`)}>Edit contact</button>
                <button onClick={() => removeContact(contact['Id'])}>Delete contact</button>
            </section>
        </div>

    )
}

export default ContactPreview;