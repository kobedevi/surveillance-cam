import firebase from 'firebase/app';
import { useEffect, useState } from 'react';

/**
 * Configure Web Credentials with FCM
 */
const useRegistrationToken = () => {
  const [token, setToken] = useState();
  const [error, setError] = useState();

  // Notification.requestPermission();

  useEffect(() => {
    const getToken = async () => {
      // Get permission
      const permission = await Notification.requestPermission();

      if (permission === 'granted') {
        try {
          // Get registration token
          const messaging = firebase.messaging();
          const currentToken = await messaging.getToken({
            vapidKey:
              'BGa0XRcagyN59XPT7cFe2FWP9bxdRTfMksKADx0SAHbGvq_KhhcS9cXZv_5p9q2P_-yn8-gIJqDWR-YVF-QFWts',
          });

          if (currentToken) {
            setToken(currentToken);
            setError(null);

            // Send token to firestore
            const db = firebase.firestore();
            const settingsRef = db.collection('app').doc('settings');
            await settingsRef.get();
            settingsRef.update({
              registrationTokens:
                firebase.firestore.FieldValue.arrayUnion(currentToken),
            });
          } else {
            throw new Error('Failed to get registration token.');
          }
        } catch (err) {
          setToken(null);
          setError(err);
        }
      } else {
        setToken(null);
        setError('Please allow notifications and refresh the window.');
      }
    };

    getToken();
  }, []);

  return { token, error };
};

export default useRegistrationToken;
