import firebase from 'firebase/app';
import { useState } from 'react';
import { Alert, Button } from '../../Design';

const Login = () => {
  const [error, setError] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <>
      <section className="login">
        <h1>Inloggen</h1>
        <form onSubmit={handleSubmit}>
          {error && <Alert>{error.message}</Alert>}
          <label htmlFor="email">Email</label>
          <input type="email" name="email" />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" />
          <Button icon={false} type="submit">
            Login
          </Button>
        </form>
      </section>
    </>
  );
};

export default Login;
