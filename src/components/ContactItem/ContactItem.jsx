import PropTypes from 'prop-types';
import { ListItemText, ListItem } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import { useDeleteContactMutation } from 'redux/contactsSlice';

export const ContactItem = ({ name, number, id }) => {
  const [deleteContact, { isLoading }] = useDeleteContactMutation();
  return (
    <ListItem>
      <ListItemText primary={`${name}: ${number}`} />
      <IconButton
        disabled={isLoading}
        onClick={() => deleteContact(id)}
        edge="end"
        aria-label="delete"
      >
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
