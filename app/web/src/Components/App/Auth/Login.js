import firebase from 'firebase/app';
import { useState } from 'react';
import './Login.scss';
import Alert from '../../Design/Alert';

const Login = ({setUser}) => {
  const [error, setError] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
      .then((res) => setUser(res.user.email))
    } catch (error) {
      setError(error);
    }
  };

  return (
    <>
      <div className="center">
        <h1>Inloggen</h1>
        <form onSubmit={handleSubmit}>
          <div className="inputfield">
            <label htmlFor="email"></label>

            <input placeholder="email" type="email" name="email" />
          </div>
          <div className="inputfield">
            <label htmlFor="password"></label>

            <input placeholder="password" type="password" name="password" />
          </div>
          <div className="btn">
            <button type="submit">Login</button>
          </div>

        </form>
        {
          error && <Alert color="danger">{error.message}</Alert>
        }
      </div>
      
      {/* 
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-4">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="email"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    name="passowrd"
                    placeholder="password"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      */}
    </>
  );
};

export default Login;
