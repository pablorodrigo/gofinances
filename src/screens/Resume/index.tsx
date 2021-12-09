/**
 * Created by Pablo Silva
 * Date: 2021/11/09
 * Time: 22:03
 */

import React, { useEffect, useState } from 'react';
import {
  Container,
  Title,
  Header,
  Content,
  ChartContainer,
  MonthSelect,
  MonthSelectButton,
  Month,
  MonthSelectIcon,
} from './styles';
import { HistoryCar } from '../../components/HistoryCar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import env from '../../shared/env';
import { categories } from '../../utils/categories';
import { VictoryPie } from 'victory-native';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

interface ITransactionProps {
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface ICategoryProps {
  key: string;
  name: string;
  total: number;
  totalFormatted: string;
  color: string;
  percent: string;
}

export function Resume() {
  const [totalByCategories, setTotalByCategories] = useState<ICategoryProps[]>(
    []
  );

  const theme = useTheme();

  async function loadData() {
    const response = await AsyncStorage.getItem(env.STORAGE_DATA_KEY);
    const responseFormatted = response ? JSON.parse(response) : [];

    console.log(responseFormatted);

    const outcomes = responseFormatted.filter(
      (outcome: ITransactionProps) => outcome.type === 'negative'
    );

    const totalOutComes = outcomes.reduce(
      (accumulator: number, outcome: ITransactionProps) => {
        return accumulator + outcome.amount;
      },
      0
    );

    const totalByCategory: ICategoryProps[] = [];

    categories.forEach((category) => {
      let categorySum = 0;

      outcomes.forEach((outcome: ITransactionProps) => {
        if (outcome.category === category.key) {
          categorySum += Number(outcome.amount);
        }
      });

      if (categorySum > 0) {
        const totalFormatted = categorySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });

        const percent = ((categorySum / totalOutComes) * 100).toFixed(0) + '%';

        totalByCategory.push({
          key: category.key,
          name: category.name,
          total: categorySum,
          color: category.color,
          totalFormatted,
          percent,
        });
      }
    });

    //console.log(totalByCategory);
    setTotalByCategories(totalByCategory);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <Content
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: useBottomTabBarHeight(),
        }}
      >
        <MonthSelect>
          <MonthSelectButton>
            <MonthSelectIcon name="chevron-left" />
          </MonthSelectButton>

          <Month>algo</Month>

          <MonthSelectButton>
            <MonthSelectIcon name="chevron-right" />
          </MonthSelectButton>
        </MonthSelect>

        <ChartContainer>
          <VictoryPie
            data={totalByCategories}
            colorScale={totalByCategories.map((category) => category.color)}
            style={{
              labels: {
                fontSize: RFValue(18),
                fontWeight: 'bold',
                fill: theme.colors.shape,
              },
            }}
            labelRadius={50}
            x="percent"
            y="total"
          />
        </ChartContainer>
        {totalByCategories.map((item) => (
          <HistoryCar
            key={item.key}
            title={item.name}
            amount={item.totalFormatted}
            color={item.color}
          />
        ))}
      </Content>
    </Container>
  );
}
