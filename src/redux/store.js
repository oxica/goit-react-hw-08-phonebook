import { configureStore } from '@reduxjs/toolkit';
import { contactsApi } from './contactsApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import { filterSlice } from 'redux/filterSlice';

export const store = configureStore({
  reducer: {
    filter: filterSlice.reducer,
    [contactsApi.reducerPath]: contactsApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(contactsApi.middleware),
});

setupListeners(store.dispatch);
