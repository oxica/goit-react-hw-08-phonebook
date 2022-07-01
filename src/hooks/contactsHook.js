import { useDispatch, useSelector } from 'react-redux';
import { contactsActions } from 'redux/contacts';
import { getContact } from 'redux/auth/authApi';

export const useContacts = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContact);
  const onAddContact = contact => dispatch(contactsActions.addContact(contact));
  const onDeleteContact = contactId =>
    dispatch(contactsActions.deleteContact(contactId));

  return {
    contacts,
    addContact: onAddContact,
    deleteContact: onDeleteContact,
  };
};
