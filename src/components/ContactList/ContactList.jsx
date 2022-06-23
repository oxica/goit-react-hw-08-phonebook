import s from './ContactList.module.css';
import ContactItem from '../ContactItem/ContactItem';
import { useSelector } from 'react-redux';

const getVisibleContacts = (items, filter) =>
  items.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

const ContactList = () => {
  const items = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.contacts.filter);
  const contacts = getVisibleContacts(items, filter);

  return (
    <ul className={s.list}>
      {contacts.length ? (
        contacts.map(({ id, name, number }) => (
          <ContactItem key={id} id={id} name={name} number={number} />
        ))
      ) : (
        <p className={s.text}>No contacts</p>
      )}
    </ul>
  );
};

export default ContactList;
