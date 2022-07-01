import { Box } from '@mui/material';
import { ContactForm } from '../components/ContactForm/ContactForm';
import { Filter } from '../components/Filter/index';
import { ContactsList } from '../components/ContactList/ContactList';

const ContactsView = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      backgroundColor="#ccffcd"
      paddingBottom="250px"
    >
      <ContactForm />
      <Filter />
      <ContactsList />
    </Box>
  );
};

export default ContactsView;
