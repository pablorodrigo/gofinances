/**
 * Created by Pablo Silva
 * Date: 2021/09/07
 * Time: 10:04
 */

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
} from './styles';

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
              <UserGreeting>Hello, </UserGreeting>
              <UserName>Pablo</UserName>
            </User>
          </UserInfo>
          <IconLogout name="power" />
        </UserContainer>
      </Header>
    </Container>
  );
}
