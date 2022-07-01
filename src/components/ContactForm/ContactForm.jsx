import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

import {
  useAddContactMutation,
  useGetContactsQuery,
} from 'redux/contactsSlice';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const { data: contacts } = useGetContactsQuery();
  const [addContact] = useAddContactMutation();

  const onAddContact = contact => {
    if (contacts && contacts.some(item => item.name === contact.name)) {
      alert(`${contact.name} is already in contacts`);
      return;
    }
    addContact(contact);
  };

  const onChangeInput = event => {
    const { name, value } = event.target;
    if (name === 'name') {
      setName(value);
    }
    if (name === 'number') {
      setNumber(value);
    }
  };

  const onSubmitForm = event => {
    event.preventDefault();

    if (name && number) {
      onAddContact({
        name,
        number,
      });
    } else {
      alert('The number field and name are empty, fill them in!');
    }

    reset(event);
  };

  const reset = event => {
    setName('');
    setNumber('');
    event.currentTarget.reset();
  };

  return (
    <Box textAlign="center">
      <Typography
        style={{
          fontSize: '40px',
          fontWeight: 'bold',
          lineHeight: '2.8',
          marginBottom: '20px',
        }}
        variant="h3"
      >
        Phonebook
      </Typography>
      <Box
        component="form"
        display="flex"
        justifyContent="center"
        flexDirection="column"
        sx={{
          '& > :not(style)': { m: 1 },
        }}
        autoComplete="off"
        onSubmit={onSubmitForm}
      >
        <TextField
          sx={{ width: '50ch' }}
          type="text"
          name="name"
          onChange={onChangeInput}
          id="filled-basic"
          label="Name"
          variant="filled"
          required
        />
        <TextField
          sx={{ width: '50ch' }}
          value={number}
          type="tel"
          name="number"
          id="filled-basic"
          label="Number"
          variant="filled"
          onChange={onChangeInput}
          required
        />
        <Button disabled={!name || !number} type="submit">
          Add Contact
        </Button>
      </Box>
    </Box>
  );
};
