import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Loader, Segment, Header, Input } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import Navbar from './Navbar';

const GlobalContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await axios.get('/api/global/contacts');
        setContacts(res.data.contacts);
      } catch (error) {
        console.error(error.response.data);
        toast.error('Failed to fetch global contacts');
      } finally {
        setLoading(false);
      }
    };

    setUserId(localStorage.getItem('userdbuserId') || '');
    
    fetchContacts();
  }, [userId]);

  const handleSpamMarking = async (phoneNumber) => {
    try {
      await axios.post('/api/global/mark-as-spam', { phoneNumber, userId });
      setContacts((prevContacts) =>
        prevContacts.map((contact) =>
          contact.phoneNumber === phoneNumber
            ? { ...contact, spamLikelihood: contact.spamLikelihood + 1, spamMarkedBy: [...contact.spamMarkedBy, userId] }
            : contact
        )
      );
      toast.success('Number marked as spam');
    } catch (error) {
      console.error(error.response.data);
      toast.error('Failed to mark number as spam');
    }
  };
  
  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.phoneNumber.includes(searchQuery)
  );

  return (
    <>
      <Navbar />
      <Segment>
        <Header as="h2">Global Contacts</Header>
        <Input
          icon="search"
          placeholder="Search..."
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
        />
        {loading ? (
          <Loader active inline="centered" />
        ) : (
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Phone Number</Table.HeaderCell>
                <Table.HeaderCell>Spam Likelihood</Table.HeaderCell>
                <Table.HeaderCell>Mark as Spam</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {filteredContacts.map((contact) => (
                <Table.Row key={contact.phoneNumber}>
                  <Table.Cell>{contact.name}</Table.Cell>
                  <Table.Cell>{contact.phoneNumber}</Table.Cell>
                  <Table.Cell>{contact.spamLikelihood}</Table.Cell>
                  <Table.Cell>
                    <Button
                      color={contact.spamMarkedBy.includes(userId) ? 'grey' : 'red'}
                      disabled={contact.spamMarkedBy.includes(userId)}
                      onClick={() => handleSpamMarking(contact.phoneNumber)}
                    >
                      {contact.spamMarkedBy.includes(userId) ? 'Marked as Spam' : 'Mark as Spam'}
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        )}
      </Segment>
    </>
  );
};

export default GlobalContacts;
