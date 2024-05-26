
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Loader, Message } from 'semantic-ui-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  let nav = useNavigate();

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('/api/auth/send-otp', { email });
      console.log(res.data);
      if (res.status === 200) {
        nav("/verifyOtp");
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
        <h1>Email</h1>
        <Input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          placeholder="Enter your email"
        />
      </Form.Field>
      {error && (
        <Message negative>
          <Message.Header>Error</Message.Header>
          <p>{error}</p>
        </Message>
      )}
      <Button type="submit" primary disabled={loading}>
        Send OTP
      </Button>
      {loading && <Loader active inline />}
    </Form>
     <div className="register-link">
     <p>New user? <a href="/register">Register here</a></p>
   </div>
   </>
  );
};

export default Login;
