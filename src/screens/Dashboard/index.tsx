/**
 * Created by Pablo Silva
 * Date: 2021/09/07
 * Time: 10:04
 */

import getTranslation from '../../i18n/supportedLanguages';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Container,
  Header,
  UserInfo,
  UserGreeting,
  UserName,
  User,
  Photo,
  UserContainer,
  LogoutButton,
  IconLogout,
  HighlightCards,
  Transactions,
  Title,
  TransactionList,
} from './styles';
import { HighlightCard } from '../../components/HighlightCard';
import {
  ITransactionCardProps,
  TransactionCard,
} from '../../components/TransactionCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import env from '../../shared/env';
import { useFocusEffect } from '@react-navigation/native';

export interface IDataListProps extends ITransactionCardProps {
  id: string;
}

export function Dashboard() {
  const [data, setData] = useState<IDataListProps[]>([]);

  async function loadTransactions() {
    const response = await AsyncStorage.getItem(env.STORAGE_DATA_KEY);
    const transactions = response ? JSON.parse(response) : [];

    const transactionsFormatted: IDataListProps[] = transactions.map(
      (transaction: IDataListProps) => {
        const amount = Number(transaction.amount).toLocaleString(
          getTranslation('locale'),
          {
            style: 'currency',
            currency: getTranslation('currency'),
          }
        );

        const date = Intl.DateTimeFormat(getTranslation('locale'), {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
        }).format(new Date(transaction.date));

        return {
          id: transaction.id,
          name: transaction.name,
          amount,
          type: transaction.type,
          category: transaction.category,
          date,
        };
      }
    );

    setData(transactionsFormatted);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

  return (
    <Container>
      <Header>
        <UserContainer>
          <UserInfo>
            <Photo
              source={{
                uri: 'https://avatars.githubusercontent.com/u/6105149?v=4',
              }}
            />
            <User>
              <UserGreeting>{getTranslation('hello')}, </UserGreeting>
              <UserName>Pablo</UserName>
            </User>
          </UserInfo>
          <LogoutButton>
            <IconLogout name="power" />
          </LogoutButton>
        </UserContainer>
      </Header>
      <HighlightCards>
        <HighlightCard
          type="up"
          title={getTranslation('transfers')}
          amount="R$ 18.000,000"
          lastTransaction="Last transaction at 12/12/2012"
        />
        <HighlightCard
          type="down"
          title={getTranslation('debits')}
          amount="R$ 1.259,000"
          lastTransaction="Last cash inflow at 12/12/2012"
        />
        <HighlightCard
          type="total"
          title={getTranslation('total')}
          amount="R$ 18.000,000"
          lastTransaction="updated at 12/12/2012"
        />
      </HighlightCards>
      <Transactions>
        <Title>Listagem</Title>
        <TransactionList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
        {}
      </Transactions>
    </Container>
  );
}
