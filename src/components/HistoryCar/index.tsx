/**
 * Created by Pablo Silva
 * Date: 2021/11/09
 * Time: 22:09
 */

import React from 'react';
import { Container, Title, Amount } from './styles';

interface IProps {
  title: string;
  amount: string;
  color: string;
}

export function HistoryCar({ title, amount, color }: IProps) {
  return (
    <Container color={color}>
      <Title>{title}</Title>
      <Amount>{amount}</Amount>
    </Container>
  );
}
