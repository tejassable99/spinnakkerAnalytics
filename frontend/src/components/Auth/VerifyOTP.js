
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Loader, Message } from 'semantic-ui-react';

const VerifyOTP = () => {
  const [formData, setFormData] = useState({ email: '', otp: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { email, otp } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('/api/auth/verify-otp', formData);
      console.log(res.data);
      if (res.status === 200) {
        const token = res.data.token;
        const userId = res.data.userId;
        localStorage.setItem('userdbtoken', token);
        localStorage.setItem('userdbuserId', userId);
        navigate("/AddContact");
      }
    } catch (error) {
      setError(error.response.data.msg || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={onSubmit} loading={loading}>
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
        <label>OTP</label>
        <Input
          type="text"
          name="otp"
          value={otp}
          onChange={onChange}
          required
          placeholder="Enter the OTP"
        />
      </Form.Field>
      {error && (
        <Message negative>
          <Message.Header>Error</Message.Header>
          <p>{error}</p>
        </Message>
      )}
      <Button type="submit" primary disabled={loading}>
        Verify OTP
      </Button>
      {loading && <Loader active inline />}
    </Form>
  );
};

export default VerifyOTP;
