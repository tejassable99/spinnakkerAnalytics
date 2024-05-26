
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Loader, Message } from 'semantic-ui-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    city: '',
    country: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { name, phoneNumber, email, city, country } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('/api/auth/register', formData);
      console.log(res.data);
      if (res.status === 201) {
        navigate("/");
      }
    } catch (error) {
      setError(error.response.data.msg || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Form onSubmit={onSubmit} loading={loading}>
      <Form.Field>
        <label>Name</label>
        <Input
          type="text"
          name="name"
          value={name}
          onChange={onChange}
          required
          placeholder="Enter your name"
        />
      </Form.Field>
      <Form.Field>
        <label>Phone Number</label>
        <Input
          type="text"
          name="phoneNumber"
          value={phoneNumber}
          onChange={onChange}
          required
          placeholder="Enter your phone number"
        />
      </Form.Field>
      <Form.Field>
        <label>Email</label>
        <Input
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          required
          placeholder="Enter your email"
        />
      </Form.Field>
      <Form.Field>
        <label>City</label>
        <Input
          type="text"
          name="city"
          value={city}
          onChange={onChange}
          placeholder="Enter your city"
        />
      </Form.Field>
      <Form.Field>
        <label>Country</label>
        <Input
          type="text"
          name="country"
          value={country}
          onChange={onChange}
          placeholder="Enter your country"
        />
      </Form.Field>
      {error && (
        <Message negative>
          <Message.Header>Error</Message.Header>
          <p>{error}</p>
        </Message>
      )}
      <Button type="submit" primary disabled={loading}>
        Register
      </Button>
      {loading && <Loader active inline />}
    </Form>
    <div className="register-link">
     <p>existing user? <a href="/">Login here</a></p>
   </div>
   

    </>
  );
};

export default Register;
