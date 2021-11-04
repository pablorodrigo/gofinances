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

interface HighlightProps {
  amount: string;
}

interface HighlightData {
  incomes: HighlightProps;
  outcomes: HighlightProps;
  total: HighlightProps;
}

export function Dashboard() {
  const [transactions, setTransactions] = useState<IDataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>(
    {} as HighlightData
  );

  async function loadTransactions() {
    const response = await AsyncStorage.getItem(env.STORAGE_DATA_KEY);
    const transactions = response ? JSON.parse(response) : [];

    let incomeTotal = 0;
    let outcomeTotal = 0;

    const transactionsFormatted: IDataListProps[] = transactions.map(
      (transaction: IDataListProps) => {
        if (transaction.type === 'positive') {
          incomeTotal += Number(transaction.amount);
        } else {
          outcomeTotal += Number(transaction.amount);
        }

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

    setTransactions(transactionsFormatted);

    const total = incomeTotal - outcomeTotal;

    setHighlightData({
      incomes: {
        amount: incomeTotal.toLocaleString(getTranslation('locale'), {
          style: 'currency',
          currency: getTranslation('currency'),
        }),
      },
      outcomes: {
        amount: outcomeTotal.toLocaleString(getTranslation('locale'), {
          style: 'currency',
          currency: getTranslation('currency'),
        }),
      },
      total: {
        amount: total.toLocaleString(getTranslation('locale'), {
          style: 'currency',
          currency: getTranslation('currency'),
        }),
      },
    });
  }

  /*useEffect(() => {
    loadTransactions();
  }, []);*/

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
          amount={highlightData.incomes.amount}
          lastTransaction="Last transaction at 12/12/2012"
        />
        <HighlightCard
          type="down"
          title={getTranslation('debits')}
          amount={highlightData.outcomes.amount}
          lastTransaction="Last cash inflow at 12/12/2012"
        />
        <HighlightCard
          type="total"
          title={getTranslation('total')}
          amount={highlightData.total.amount}
          lastTransaction="updated at 12/12/2012"
        />
      </HighlightCards>
      <Transactions>
        <Title>Listagem</Title>
        <TransactionList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
        {}
      </Transactions>
    </Container>
  );
}
