import firebase from 'firebase/app';
import { useState } from 'react';

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
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input type="email" name="email" />

      <label htmlFor="password">Password</label>
      <input type="password" name="password" />

      <button type="submit">Login</button>

      {error && <p>{error.message}</p>}
    </form>
  );
};

export default Login;
