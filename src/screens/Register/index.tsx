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
import { InputForm } from '../../components/Forms/InputForm';
import { useForm } from 'react-hook-form';

interface IFormData {
  name: string;
  amount: string;
}

export function Register() {
  const [category, setCategory] = useState({
    key: 'category',
    name: 'category',
  });
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const { control, handleSubmit } = useForm();

  function handleTransactionsTypeSelected(type: 'up' | 'down') {
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }
  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  function handleRegister(form: IFormData) {
    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key,
    };

    console.log(data);
  }

  return (
    <Container>
      <Header>
        <Title>{getTranslation('register')}</Title>
      </Header>
      <Form>
        <Fields>
          <InputForm
            name="name"
            control={control}
            placeholder={getTranslation('name')}
          />
          <InputForm
            name="amount"
            control={control}
            placeholder={getTranslation('price')}
          />
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
        <Button
          onPress={handleSubmit(handleRegister)}
          title={getTranslation('send')}
        />
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
