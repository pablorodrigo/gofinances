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
  LoadContainer,
} from './styles';
import { HighlightCard } from '../../components/HighlightCard';
import {
  ITransactionCardProps,
  TransactionCard,
} from '../../components/TransactionCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';
import { useAuth } from '../../hooks/auth';

export interface IDataListProps extends ITransactionCardProps {
  id: string;
}

interface HighlightProps {
  amount: string;
  lastTransaction: string;
}

interface HighlightData {
  incomes: HighlightProps;
  outcomes: HighlightProps;
  total: HighlightProps;
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<IDataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>(
    {} as HighlightData
  );

  const theme = useTheme();
  const { signOut, user } = useAuth();

  function getLastTransactionFormattedDate(
    collection: IDataListProps[],
    type: 'positive' | 'negative'
  ) {
    const collectionFiltered = collection.filter(
      (transaction) => transaction.type === type
    );

    if (collectionFiltered.length === 0) {
      return 0;
    }

    const transactions = collection
      .filter((transaction) => transaction.type === type)
      .map((transaction) => new Date(transaction.date).getTime());

    const lastTransaction = new Date(Math.max.apply(Math, transactions));

    /* const lastTransactionFormatted = Intl.DateTimeFormat(
      getTranslation('locale'),
      {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
      }
    ).format(lastTransaction);*/
    // BR
    const lastTransactionFormatted = `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString(
      'pt-BR',
      { month: 'long' }
    )}`;

    return lastTransactionFormatted;
  }

  async function loadTransactions() {
    const dataKey = `${process.env.STORAGE_DATA_KEY_TRANSACTIONS}_user:${user.id}`;
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    let incomeTotal = 0;
    let outcomeTotal = 0;

    console.log(user);

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

    const lastTransactionIncomes = getLastTransactionFormattedDate(
      transactions,
      'positive'
    );

    const lastTransactionOutcomes = getLastTransactionFormattedDate(
      transactions,
      'negative'
    );

    const totalInterval = `01 until ${lastTransactionOutcomes}`;

    const total = incomeTotal - outcomeTotal;

    setHighlightData({
      incomes: {
        amount: incomeTotal.toLocaleString(getTranslation('locale'), {
          style: 'currency',
          currency: getTranslation('currency'),
        }),
        lastTransaction:
          lastTransactionIncomes === 0
            ? 'Não há transações'
            : `Last transaction at ${lastTransactionIncomes}`,
      },
      outcomes: {
        amount: outcomeTotal.toLocaleString(getTranslation('locale'), {
          style: 'currency',
          currency: getTranslation('currency'),
        }),
        lastTransaction:
          lastTransactionOutcomes === 0
            ? 'Não há transações'
            : 'Last transaction at ' + lastTransactionOutcomes,
      },
      total: {
        amount: total.toLocaleString(getTranslation('locale'), {
          style: 'currency',
          currency: getTranslation('currency'),
        }),
        lastTransaction:
          incomeTotal === 0 || outcomeTotal === 0 ? '' : totalInterval,
      },
    });
    setIsLoading(false);
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
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadContainer>
      ) : (
        <>
          <Header>
            <UserContainer>
              <UserInfo>
                <Photo
                  source={{
                    uri: user.photo,
                  }}
                />
                <User>
                  <UserGreeting>{getTranslation('hello')}, </UserGreeting>
                  <UserName>{user.name}</UserName>
                </User>
              </UserInfo>
              <LogoutButton onPress={signOut}>
                <IconLogout name="power" />
              </LogoutButton>
            </UserContainer>
          </Header>
          <HighlightCards>
            <HighlightCard
              type="up"
              title={getTranslation('transfers')}
              amount={highlightData.incomes.amount}
              lastTransaction={highlightData.incomes.lastTransaction}
            />
            <HighlightCard
              type="down"
              title={getTranslation('debits')}
              amount={highlightData.outcomes.amount}
              lastTransaction={highlightData.outcomes.lastTransaction}
            />
            <HighlightCard
              type="total"
              title={getTranslation('total')}
              amount={highlightData.total.amount}
              lastTransaction={highlightData.total.lastTransaction}
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
        </>
      )}
    </Container>
  );
}
