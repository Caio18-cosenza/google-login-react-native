import React, { useState } from 'react';
import * as AuthSession from 'expo-auth-session';

import { User, UserProps } from '../User';
import { Button } from '../Button';

import { Container } from './styles';

type AuthResponseProps = {
  params: {
    access_token: string;
  };
  type: string;
};

export function Form() {
  const [userData, setUserData] = useState<UserProps>({} as UserProps);

  const handleGoogleSignIn = async () => {
    try {
      const CLIENT_ID =
        '520399667268-eogqk0o9361g4r2aiie3e2in0kg5iapd.apps.googleusercontent.com';
      const REDIRECT_URI = 'https://auth.expo.io/@caio18/formapp';
      const SCOPE = encodeURI('profile email');
      const RESPONSE_TYPE = 'token';

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}&response_type=${RESPONSE_TYPE}`;
      const { type, params } = (await AuthSession.startAsync({
        authUrl,
      })) as AuthResponseProps;
      if (type === 'success') {
        const response = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`
        );
        const user = await response.json();
        setUserData(user);
      } else {
      }
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <Container>
      <Button
        icon='google'
        title='Entrar com Google'
        onPress={handleGoogleSignIn}
      />

      <User user={userData} />
    </Container>
  );
}
