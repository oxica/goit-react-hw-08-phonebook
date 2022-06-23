import React, { useState } from 'react';
import s from './ContactForm.module.css';
import {
  useAddContactMutation,
  useGetContactsApiQuery,
} from 'redux/contactsApi';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [addContact] = useAddContactMutation();
  const { data } = useGetContactsApiQuery();

  const handleChange = e => {
    const prop = e.currentTarget.name;
    switch (prop) {
      case 'name':
        setName(e.currentTarget.value);
        break;
      case 'phone':
        setPhone(e.currentTarget.value);
        break;
      default:
        throw new Error('Error');
    }
  };

  const handleAddContact = async e => {
    e.preventDefault();
    if (
      data.find(contact => contact.name.toLowerCase() === name.toLowerCase())
    ) {
      setName('');
      setPhone('');
      return alert(`Number: ${name} is already in phonebook`);
    }
    if (name && phone) {
      await addContact({ name: name, phone: phone }).unwrap();
      setName('');
      setPhone('');
    }
  };

  return (
    <form className={s.form} onSubmit={handleAddContact}>
      <label>
        Name
        <input
          className={s.inputName}
          value={name}
          onChange={handleChange}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label>
        Number
        <input
          className={s.inputNumber}
          value={phone}
          onChange={handleChange}
          type="tel"
          name="phone"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>

      <button type="submit" className={s.buttonEditor}>
        Add contact
      </button>
    </form>
  );
}
