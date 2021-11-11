/**
 * Created by Pablo Silva
 * Date: 2021/11/09
 * Time: 22:03
 */

import React from 'react';
import { Container, Title, Header } from './styles';
import { HistoryCar } from '../../components/HistoryCar';

export function Resume() {
  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <HistoryCar title="Compras" amount="150" color="red" />
    </Container>
  );
}
