import { Grid, List, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { ContactItem } from '../ContactItem/ContactItem';
import { useFilter } from 'hooks/filterHook';
import { useGetContactsQuery } from 'redux/contactsSlice';
import { useMemo } from 'react';

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark' ? '#1A2027' : 'rgba(0, 0, 0, 0.06)',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  minWidth: 400,
  color: theme.palette.text.primary,
}));

export const ContactsList = () => {
  const { filter } = useFilter();
  const { data: contacts } = useGetContactsQuery();

  const filteredContacts = useMemo(() => {
    return (
      contacts?.filter(contact =>
        contact.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
      ) ?? []
    );
  }, [filter, contacts]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      sx={{ flexGrow: 1 }}
    >
      <StyledPaper
        sx={{
          my: 1,
          mx: 'auto',
          p: 2,
        }}
      >
        <Grid item xs={12} md={6}>
          <List>
            {filteredContacts &&
              filteredContacts.map(({ name, number, id }) => (
                <ContactItem key={id} name={name} number={number} id={id} />
              ))}
          </List>
        </Grid>
      </StyledPaper>
    </Box>
  );
};
