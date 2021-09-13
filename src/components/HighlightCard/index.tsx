/**
 * Created by Pablo Silva
 * Date: 2021/09/13
 * Time: 13:25
 */

import React from 'react'
import {
  Container,
  Title,
  Header,
  Icon,
  Footer,
  Amount,
  LastTransaction,
} from './styles'

interface IProps {
  title: string
  amount: string
  lastTransaction: string
  type: 'up' | 'down' | 'total'
}

const icon = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle',
  total: 'dollar-sign',
}

export function HighlightCard({
  type,
  title,
  amount,
  lastTransaction,
}: IProps) {
  return (
    <Container type={type}>
      <Header>
        <Title type={type}>{title}</Title>
        <Icon name={icon[type]} type={type} />
      </Header>

      <Footer>
        <Amount type={type}>{amount}</Amount>
        <LastTransaction type={type}>{lastTransaction}</LastTransaction>
      </Footer>
    </Container>
  )
}
