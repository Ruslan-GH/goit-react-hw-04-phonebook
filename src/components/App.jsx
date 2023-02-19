import { useState, useEffect } from 'react';
import PhonebookForm from '../components/PhonebookForm';
import Filter from './Filter';
import Contacts from './Contacts/Contacts';

const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(window.localStorage.getItem('contacts')) ?? [
      { id: '1', name: 'Rosie Simpson', number: '+ 459-12-56' },
      { id: '2', name: 'Hermione Kline', number: '+ 443-89-12' },
    ]
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const deleteContact = contactId => {
    setContacts(state => state.filter(contact => contact.id !== contactId));
  };

  const addContact = newContact => {
    const checkedName = contacts.find(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (checkedName) {
      alert('This Name already exist!');
      return;
    }

    setContacts(prevState => [newContact, ...contacts]);
  };

  const findDuplicate = newContactName => {
    const isDublicate = contacts.some(
      contact => contact.name === newContactName
    );

    if (isDublicate) {
      return alert('This Name already exist!');
    }
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getFilterContact = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <div style={{ marginLeft: '40px' }}>
      <h1>Phonebook</h1>
      <PhonebookForm onSubmit={addContact} />
      <h1>Contacts</h1>
      <Filter value={filter} onChange={changeFilter} />
      <Contacts contacts={getFilterContact()} onDeleteContact={deleteContact} />
    </div>
  );
};

export default App;
