/**
 * Created by Pablo Silva
 * Date: 2021/09/15
 * Time: 16:32
 */

import React from 'react';
import { Container, Title, Icon, Button } from './styles';
import { RectButtonProps } from 'react-native-gesture-handler';

const icons = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle',
};

interface IProps extends RectButtonProps {
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
    <Container type={type} isActive={isActive}>
      <Button {...rest}>
        <Icon name={icons[type]} type={type} />
        <Title>{title}</Title>
      </Button>
    </Container>
  );
}
