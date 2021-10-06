/**
 * Created by Pablo Silva
 * Date: 2021/09/14
 * Time: 20:30
 */

import React, { useState } from 'react';
import * as Yup from 'yup';
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
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';
import { CategorySelect } from '../CategorySelect';
import { InputForm } from '../../components/Forms/InputForm';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

export interface IFormDataProps {
  name: string;
  amount: number;
}

const schema = Yup.object({
  name: Yup.string().required('nome é obrigatorio'),
  amount: Yup.number()
    .typeError('informe um valor numerico')
    .positive('o valor nao pode ser negativo')
    .required('preco é obrigatorio'),
}).required();

export function Register() {
  const [category, setCategory] = useState({
    key: 'category',
    name: 'category',
  });
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormDataProps>({ resolver: yupResolver(schema) });

  function handleTransactionsTypeSelected(type: 'up' | 'down') {
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }
  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  function handleRegister(form: IFormDataProps) {
    if (!transactionType) return Alert.alert('Selecione o tipo da transacãõ');

    if (category.key === 'category')
      return Alert.alert('Selecione uma categoria');

    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key,
    };

    console.log(data);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm
              name="amount"
              control={control}
              placeholder={getTranslation('price')}
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
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
    </TouchableWithoutFeedback>
  );
}
