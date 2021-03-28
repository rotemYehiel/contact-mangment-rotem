

import ContactPreview from './ContactPreview';

const ContactList = (props) => {
    const { contacts, userId } = props;
    return (
        <ul className="contact-list-cmp">
            {contacts.map((contact, index) => (
                <li key={index} className="contact" style={{ backgroundColor: 'lightblue' }}>
                    <ContactPreview contact={contact} userId={userId} />
                </li>
            ))}

        </ul>
    )

}
export default ContactList;