/**
 * Created by Pablo Silva
 * Date: 2021/09/15
 * Time: 16:32
 */

import React from 'react';
import { Container, Title, Icon } from './styles';
import { TouchableOpacityProps } from 'react-native';

const icons = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle',
};

interface IProps extends TouchableOpacityProps {
  title: string;
  type: 'up' | 'down';
  isActive: boolean;
}

export function TransactionTypeButton({
  title,
  type,
  isActive,
  ...rest
}: IProps) {
  return (
    <Container {...rest} type={type} isActive={isActive}>
      <Icon name={icons[type]} type={type} />
      <Title>{title}</Title>
    </Container>
  );
}
