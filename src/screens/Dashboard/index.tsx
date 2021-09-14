/**
 * Created by Pablo Silva
 * Date: 2021/09/07
 * Time: 10:04
 */

import getTranslation from '../../i18n/supportedLanguages';
import React from 'react';
import {
  Container,
  Header,
  UserInfo,
  UserGreeting,
  UserName,
  User,
  Photo,
  UserContainer,
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

export interface IDataList extends ITransactionCardProps {
  id: string;
}

export function Dashboard() {
  const data: IDataList[] = [
    {
      id: '1',
      type: 'positive',
      title: 'Titulo do card',
      amount: 'R$ 18.000,000',
      date: '13/04/1022',
      category: { name: 'vendas', icon: 'dollar-sign' },
    },
    {
      id: '2',

      type: 'negative',
      title: 'Titulo do card',
      amount: 'R$ 18.000,000',
      date: '13/04/1022',
      category: { name: 'alimentacao', icon: 'coffee' },
    },
    {
      id: '3',
      type: 'negative',
      title: 'Titulo do card',
      amount: 'R$ 18.000,000',
      date: '13/04/1022',
      category: { name: 'casa', icon: 'shopping-bag' },
    },
  ];
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
          <IconLogout name="power" />
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
