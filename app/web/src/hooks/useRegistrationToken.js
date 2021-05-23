import firebase from 'firebase/app';
import { useEffect, useState } from 'react';

/**
 * Configure Web Credentials with FCM
 */
const useRegistrationToken = () => {
  const [token, setToken] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const getToken = async () => {
      const messaging = firebase.messaging();

      try {
        const currentToken = await messaging.getToken({
          vapidKey:
            'BGa0XRcagyN59XPT7cFe2FWP9bxdRTfMksKADx0SAHbGvq_KhhcS9cXZv_5p9q2P_-yn8-gIJqDWR-YVF-QFWts',
        });

        if (currentToken) {
          setToken(currentToken);
          setError(null);

          const db = firebase.firestore();
          const settingsRef = db.collection('app').doc('settings');
          settingsRef.update({
            registrationTokens:
              firebase.firestore.FieldValue.arrayUnion(currentToken),
          });
        } else {
          if (Notification.permission !== 'denied') {
            await Notification.requestPermission();
          }
        }
      } catch (err) {
        setToken(null);
        setError(err);
      }
    };

    getToken();
  }, []);

  return { token, error };
};

export default useRegistrationToken;
