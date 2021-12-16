/**
 * Created by Pablo Silva
 * Date: 2021/11/09
 * Time: 22:03
 */

import React, { useCallback, useState } from 'react';
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
  LoadContainer,
} from './styles';
import { HistoryCar } from '../../components/HistoryCar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import env from '../../shared/env';
import { categories } from '../../utils/categories';
import { VictoryPie } from 'victory-native';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { addMonths, format, subMonths } from 'date-fns';
import { enUS, ptBR } from 'date-fns/locale';
import i18n from 'i18n-js';
import { ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

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
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalByCategories, setTotalByCategories] = useState<ICategoryProps[]>(
    []
  );

  const theme = useTheme();

  function handleDateChange(action: 'next' | 'prev') {
    if (action === 'next') {
      const newDate = addMonths(selectedDate, 1);
      setSelectedDate(newDate);

      console.log(newDate);
    } else {
      const newDate = subMonths(selectedDate, 1);
      setSelectedDate(newDate);
      console.log(newDate);
    }
  }

  async function loadData() {
    setIsLoading(true);
    const response = await AsyncStorage.getItem(env.STORAGE_DATA_KEY);
    const responseFormatted = response ? JSON.parse(response) : [];

    console.log(responseFormatted);

    const outcomes = responseFormatted.filter(
      (outcome: ITransactionProps) =>
        outcome.type === 'negative' &&
        new Date(outcome.date).getMonth() === selectedDate.getMonth() &&
        new Date(outcome.date).getFullYear() === selectedDate.getFullYear()
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
    setIsLoading(false);
  }
  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [selectedDate])
  );

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadContainer>
      ) : (
        <>
          <Content
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 24,
              paddingBottom: useBottomTabBarHeight(),
            }}
          >
            <MonthSelect>
              <MonthSelectButton onPress={() => handleDateChange('prev')}>
                <MonthSelectIcon name="chevron-left" />
              </MonthSelectButton>

              <Month>
                {format(selectedDate, 'MMMM, yyyy', {
                  locale: i18n.locale == 'en' ? enUS : ptBR,
                })}
              </Month>

              <MonthSelectButton onPress={() => handleDateChange('next')}>
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
        </>
      )}
    </Container>
  );
}
