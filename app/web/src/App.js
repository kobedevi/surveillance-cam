import firebase from 'firebase/app';
import { useEffect, useState } from 'react';

const App = () => {
  const [token, setToken] = useState();
  const firebaseApp = firebase.apps[0];
  console.log(token);

  useEffect(() => {
    const getToken = async () => {
      // Configure Web Credentials with FCM
      const messaging = firebase.messaging();

      try {
        const currentToken = await messaging.getToken({
          vapidKey:
            'BGa0XRcagyN59XPT7cFe2FWP9bxdRTfMksKADx0SAHbGvq_KhhcS9cXZv_5p9q2P_-yn8-gIJqDWR-YVF-QFWts',
        });

        if (currentToken) {
          // Send the token to your server and update the UI if necessary
          // ...
          setToken(currentToken);
          console.log(currentToken);
        } else {
          console.log(
            // Show permission request UI
            'No registration token available. Request permission to generate one.'
            // ...
          );
        }
      } catch (error) {
        console.log('An error occurred while retrieving token. ', error);
        // ...
      }
    };

    getToken();
  }, []);

  return (
    <>
      <h1>Dashboard</h1>

      <code>
        <pre>{JSON.stringify(firebaseApp.options, null, 2)}</pre>
      </code>

      <p>{token}</p>
    </>
  );
};

export default App;
