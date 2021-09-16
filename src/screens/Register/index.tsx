/**
 * Created by Pablo Silva
 * Date: 2021/09/14
 * Time: 20:30
 */

import React, { useState } from 'react';
import {
  Container,
  Title,
  Header,
  Form,
  Fields,
  TransactionTypes,
} from './styles';
import getTranslation from '../../i18n/supportedLanguages';
import { Input } from '../../components/Forms/Input';
import { Button } from '../../components/Forms/Button';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';

export function Register() {
  const [transactionType, setTransactionType] = useState('');

  function handleTransactionsTypeSelected(type: 'up' | 'down') {
    setTransactionType(type);
  }

  return (
    <Container>
      <Header>
        <Title>{getTranslation('register')}</Title>
      </Header>
      <Form>
        <Fields>
          <Input placeholder={getTranslation('name')} />
          <Input placeholder={getTranslation('price')} />
          <TransactionTypes>
            <TransactionTypeButton
              title="Income"
              type="up"
              onPress={() => handleTransactionsTypeSelected('up')}
              isActive={transactionType === 'up'}
            />
            <TransactionTypeButton
              title="Outcome"
              type="down"
              onPress={() => handleTransactionsTypeSelected('down')}
              isActive={transactionType === 'down'}
            />
          </TransactionTypes>
        </Fields>
        <Button title={getTranslation('send')} />
      </Form>
    </Container>
  );
}
