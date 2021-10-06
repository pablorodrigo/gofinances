/**
 * Created by Pablo Silva
 * Date: 2021/09/16
 * Time: 14:35
 */

import React from 'react';
import { Container, Title, Category, Icon } from './styles';

interface IProps {
  title: string;
  onPress: () => void;
}

export function CategorySelectButton({ title, onPress }: IProps) {
  return (
    <Container onPress={onPress}>
      <Category>{title}</Category>
      <Icon name="chevron-down" />
    </Container>
  );
}
