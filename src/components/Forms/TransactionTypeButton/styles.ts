/**
 * Created by Pablo Silva
 * Date: 2021/09/15
 * Time: 16:33
 */

import styled from 'styled-components/native';
import {
  getStatusBarHeight,
  getBottomSpace,
} from 'react-native-iphone-x-helper';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import theme from '../../../global/styles/theme';
import { css } from 'styled-components';
import { RectButton } from 'react-native-gesture-handler';

interface IIconsProps {
  type: 'up' | 'down';
}

interface IButtonProps {
  isActive: boolean;
  type: 'up' | 'down';
}

export const Container = styled.View<IButtonProps>`
  width: 48%;

  border: 1.5px solid ${({ theme }) => theme.colors.text};
  border-radius: 5px;

  ${({ isActive, type }) =>
    isActive &&
    type === 'up' &&
    css`
      background-color: ${({ theme }) => theme.colors.success_light};
      border-width: 0;
    `}
  ${({ isActive, type }) =>
    isActive &&
    type === 'down' &&
    css`
      background-color: ${({ theme }) => theme.colors.attention_light};
      border-width: 0;
    `} /*border-width: ${({ isActive }) => (isActive ? 0 : 1.5)}px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.text};*/
`;

export const Button = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  padding: 16px;
`;

export const Icon = styled(Feather)<IIconsProps>`
  font-size: ${RFValue(24)}px;
  margin-right: 12px;
  color: ${({ theme, type }) =>
    type === 'up' ? theme.colors.success : theme.colors.attention};
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;
