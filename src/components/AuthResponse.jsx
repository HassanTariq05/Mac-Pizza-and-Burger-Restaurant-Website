import React, { useEffect, useState } from 'react';
import authService from './authService';

function AuthResponse() {
  const [auth, setAuth] = useState();

  useEffect(() => {
    const fetchAuth = async () => {
      try {
        const params = {
          email: "shahid.dev93@gmail.com",
          password: "12345678",
        };

        const response = await authService.getAll(params);
        setAuth(response.data.data);
        // console.log('Auth api response:', response.data);
      } catch (error) {
        console.error('Error fetching Auth:', error);
      }
    };

    fetchAuth();
  }, []);

  return (
    <div>
      <h1>Check console</h1>
    </div>
  );
}
export default AuthResponse;
