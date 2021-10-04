/**
 * Created by Pablo Silva
 * Date: 2021/09/16
 * Time: 14:33
 */

import styled from 'styled-components/native';
import {
  getStatusBarHeight,
  getBottomSpace,
} from 'react-native-iphone-x-helper';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import theme from '../../global/styles/theme';

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  background-color: ${({ theme }) => theme.colors.shape};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  border-radius: 5px;
  padding: 18px 16px;
`;

export const Title = styled.Text``;

export const Category = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.text_dark};
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.text};
`;
