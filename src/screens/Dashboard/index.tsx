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
} from './styles';
import { HighlightCard } from '../../components/HighlightCard';

export function Dashboard() {
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
    </Container>
  );
}
