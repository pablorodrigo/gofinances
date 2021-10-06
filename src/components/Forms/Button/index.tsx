/**
 * Created by Pablo Silva
 * Date: 2021/09/14
 * Time: 21:03
 */

import React from 'react';
import { Container, Title } from './styles';
import { RectButtonProps } from 'react-native-gesture-handler';

interface IProps extends RectButtonProps {
  title: string;
  onPress: () => void;
}

export function Button({ title, onPress, ...rest }: IProps) {
  return (
    <Container onPress={onPress} {...rest}>
      <Title>{title}</Title>
    </Container>
  );
}
