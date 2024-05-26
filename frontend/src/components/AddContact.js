import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Loader, List, Header, Segment, Message } from 'semantic-ui-react';
import Navbar from './Navbar';

const AddContact = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('userdbtoken');
    const userId = localStorage.getItem('userdbuserId');

    const fetchContacts = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          'https://spinnakker-analytics.vercel.app/api/contacts/getContacts',
          { userId },
          { headers: { 'x-auth-token': token } }
        );
        setContacts(response.data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
        setError('Error fetching contacts');
      } finally {
        setLoading(false);
      }
    };

    if (token && userId) {
      fetchContacts();
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('userdbtoken');
      const userId = localStorage.getItem('userdbuserId');

      const response = await axios.post(
        'https://spinnakker-analytics.vercel.app/api/contacts',
        { name, phoneNumber, userId },
        { headers: { 'x-auth-token': token } }
      );
      console.log(response.data);

      if (response.status === 201) {
        setContacts([...contacts, response.data]);  // Update contacts without reloading the page
        setName('');
        setPhoneNumber('');
      }
    } catch (error) {
      console.error(error);
      setError('Error adding contact');
    } finally {
      setLoading(false);
    }
  };

  return (<>
  <Navbar/>
    <Segment>
      <Header as="h2">Add Contact</Header>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Name</label>
          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Field>
        <Form.Field>
          <label>Phone Number</label>
          <Input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </Form.Field>
        <Button type="submit" primary disabled={loading}>
          {loading ? <Loader active inline size="tiny" /> : 'Add Contact'}
        </Button>
      </Form>
      {error && (
        <Message negative>
          <Message.Header>Error</Message.Header>
          <p>{error}</p>
        </Message>
      )}
      <Header as="h2">Your Contacts</Header>
      <List divided relaxed>
        {contacts.map((contact) => (
          <List.Item key={contact._id}>
            <List.Content>
              <List.Header>{contact.name}</List.Header>
              <List.Description>{contact.phoneNumber}</List.Description>
            </List.Content>
          </List.Item>
        ))}
      </List>
    </Segment>
    </>
  );
};

export default AddContact;
