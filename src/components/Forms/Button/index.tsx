/**
 * Created by Pablo Silva
 * Date: 2021/09/14
 * Time: 21:03
 */

import React from 'react';
import { Container, Title } from './styles';
import { TouchableOpacityProps } from 'react-native';

interface IProps extends TouchableOpacityProps {
  title: string;
}

export function Button({ title, ...rest }: IProps) {
  return (
    <Container {...rest}>
      <Title>{title}</Title>
    </Container>
  );
}
