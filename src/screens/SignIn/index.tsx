/**
 * Created by Pablo Silva
 * Date: 2022/01/04
 * Time: 21:19
 */

import React, { useContext, useEffect, useState } from 'react';
import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper,
} from './styles';

import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { ActivityIndicator, Alert, Platform } from 'react-native';
import { SignInSocialButton } from '../../components/SignInSocialButton';
import { useAuth } from '../../hooks/auth';

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);

  const { user, signInWithGoogle } = useAuth();
  //const { signInWithGoogle, signInWithApple } = useAuth();
  const theme = useTheme();

  async function handleSignInWithGoogle() {
    try {
      setIsLoading(true);
      return await signInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert(
        'Erro ao fazer autênticação com o google',
        'tente novamente.'
      );
      setIsLoading(false);
    }
  }

  async function handleSignInWithApple() {
    try {
      setIsLoading(true);
      //return await signInWithApple();
    } catch (err) {
      console.log(err);
      Alert.alert('Não foi possível conectar com a conta Apple!');
    }
  }

  useEffect(() => {
    return () => {
      setIsLoading(false);
    };
  }, []);

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />
          <Title>Controle de suas financias de forma muito simples</Title>
        </TitleWrapper>

        <SignInTitle>Faça seu login...</SignInTitle>
      </Header>

      <Footer>
        <FooterWrapper>
          <SignInSocialButton
            title="Entrar com Google"
            svg={GoogleSvg}
            onPress={handleSignInWithGoogle}
          />

          {Platform.OS === 'ios' && (
            <SignInSocialButton
              title="Entrar com Apple"
              svg={AppleSvg}
              onPress={handleSignInWithApple}
            />
          )}
        </FooterWrapper>

        {isLoading && (
          <ActivityIndicator
            color={theme.colors.shape}
            style={{ marginTop: 18 }}
          />
        )}
      </Footer>
    </Container>
  );
}
