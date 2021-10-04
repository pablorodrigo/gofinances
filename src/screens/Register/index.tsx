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
import { CategorySelectButton } from '../../components/CategorySelectButton';
import { Modal } from 'react-native';
import { CategorySelect } from '../CategorySelect';

export function Register() {
  const [category, setCategory] = useState({
    key: 'category',
    name: 'category',
  });
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  function handleTransactionsTypeSelected(type: 'up' | 'down') {
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }
  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
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

          <CategorySelectButton
            title={category.name}
            onPress={handleOpenSelectCategoryModal}
          />
        </Fields>
        <Button title={getTranslation('send')} />
      </Form>

      <Modal visible={categoryModalOpen}>
        <CategorySelect
          category={category}
          closeSelectCategory={handleCloseSelectCategoryModal}
          setCategory={setCategory}
        />
      </Modal>
    </Container>
  );
}
