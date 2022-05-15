/**
 * Created by Pablo Silva
 * Date: 2021/09/14
 * Time: 20:30
 */

import React, { useEffect, useState } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';
import { CategorySelect } from '../CategorySelect';
import { InputForm } from '../../components/Forms/InputForm';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import uuid from 'react-native-uuid';
import { useNavigation } from '@react-navigation/native';
import { AuthContext, useAuth } from '../../hooks/auth';

export interface IFormDataProps {
  name: string;
  amount: number;
}

// fix error tipagem useNavigation
type NavigationProps = {
  navigate: (screen: string) => void;
};

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

  const navigation = useNavigation<NavigationProps>();

  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const { user } = useAuth();
  const dataKey = `${process.env.STORAGE_DATA_KEY_TRANSACTIONS}_user:${user.id}`;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormDataProps>({ resolver: yupResolver(schema) });

  function handleTransactionsTypeSelected(type: 'positive' | 'negative') {
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }
  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  async function handleRegister(form: IFormDataProps) {
    if (!transactionType) return Alert.alert('Selecione o tipo da transacãõ');

    if (category.key === 'category')
      return Alert.alert('Selecione uma categoria');

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date(),
    };
    // console.log(newTransaction);

    try {
      const data = await AsyncStorage.getItem(dataKey);

      const currentData = data ? JSON.parse(data) : [];

      const dataFormatted = [...currentData, newTransaction];

      /*const currentData = data ? JSON.parse(data) : [];

      console.log(currentData);

      const dataFormatted = [...currentData, newTransaction];

      console.log(dataFormatted);*/

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

      reset();
      setTransactionType('');
      setCategory({
        key: 'category',
        name: 'category',
      });

      navigation.navigate('histórico');
    } catch (error) {
      console.log(error);

      Alert.alert('Não foi possivel salvar');
    }
  }

  useEffect(() => {
    async function loadData() {
      const data = await AsyncStorage.getItem(dataKey);
      console.log(JSON.parse(data!));
    }

    async function deleteAll() {
      const data = await AsyncStorage.removeItem(dataKey);
    }

    // deleteAll();

    loadData();
  }, []);

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
                onPress={() => handleTransactionsTypeSelected('positive')}
                isActive={transactionType === 'positive'}
              />
              <TransactionTypeButton
                title="Outcome"
                type="down"
                onPress={() => handleTransactionsTypeSelected('negative')}
                isActive={transactionType === 'negative'}
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
