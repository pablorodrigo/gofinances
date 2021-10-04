/**
 * Created by Pablo Silva
 * Date: 2021/09/27
 * Time: 13:00
 */

import React from 'react';
import {
  Container,
  Title,
  Header,
  Category,
  Icon,
  Name,
  Separator,
  Footer,
} from './styles';
import { FlatList } from 'react-native';
import { categories } from '../../utils/categories';
import { Button } from '../../components/Forms/Button';

interface ICategory {
  key: string;
  name: string;
}

interface IProps {
  category: ICategory;
  setCategory: (category: ICategory) => void;
  closeSelectCategory: () => void;
}

export function CategorySelect({
  category,
  setCategory,
  closeSelectCategory,
}: IProps) {
  function handleCategorySelect(category: ICategory) {
    setCategory(category);
  }

  return (
    <Container>
      <Header>
        <Title>Categories</Title>
      </Header>

      <FlatList
        data={categories}
        style={{ flex: 1, width: '100%' }}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <Category
            onPress={() => handleCategorySelect(item)}
            isActive={category.key === item.key}
          >
            <Icon name={item.icon} />
            <Name>{item.name}</Name>
          </Category>
        )}
        ItemSeparatorComponent={() => <Separator />}
      />

      <Footer>
        <Button title="Selecionar" onPress={closeSelectCategory} />
      </Footer>
    </Container>
  );
}
