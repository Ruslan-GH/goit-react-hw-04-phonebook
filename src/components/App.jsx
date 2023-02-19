import { nanoid } from 'nanoid';
import React, { Component } from 'react';
import PhonebookForm from '../components/PhonebookForm';
import Filter from './Filter';
import Contacts from './Contacts/Contacts';

export class App extends Component {
  state = {
    contacts: [
      { id: '1', name: 'Rosie Simpson', number: '+ 459-12-56' },
      { id: '2', name: 'Hermione Kline', number: '+ 443-89-12' },
      { id: '3', name: 'Eden Clements', number: '+ 645-17-79' },
      { id: '4', name: 'Annie Copeland', number: '+ 227-91-26' },
    ],
    filter: '',
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  addContact = newContact => {
    const checkedName = this.state.contacts.find(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (checkedName) {
      alert('This Name already exist!' + newContact.name);
      return;
    }

    this.setState(prevState => ({
      contacts: [newContact, ...prevState.contacts],
    }));
  };

  findDuplicate = newContactName => {
    const isDublicate = this.state.contacts.some(
      contact => contact.name === newContactName
    );

    if (isDublicate) {
      alert('This Name already exist!' + newContactName);
    }
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getFilterContact = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }

  render() {
    const filterContact = this.getFilterContact();
    return (
      <div style={{ marginLeft: '40px' }}>
        <h1>Phonebook</h1>
        <PhonebookForm onSubmit={this.addContact} />
        <h1>Contacts</h1>
        <Filter value={this.state.filter} onChange={this.changeFilter} />
        <Contacts
          contacts={filterContact}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
