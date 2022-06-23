import React from 'react';
import s from './ContactItem.module.css';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/contactSlice';

const ContactItem = ({ id, name, number }) => {
  const dispatch = useDispatch();
  const contactsDelete = id => dispatch(deleteContact(id));

  return (
    <li id={id} className={s.item}>
      <p className={s.contact}>
        {name}............
        {number}
      </p>
      <button
        className={s.btn}
        type="submit"
        onClick={() => contactsDelete(id)}
      >
        Delete
      </button>
    </li>
  );
};

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};

export default ContactItem;
