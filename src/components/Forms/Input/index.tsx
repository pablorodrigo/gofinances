/**
 * Created by Pablo Silva
 * Date: 2021/09/14
 * Time: 20:48
 */

import React from 'react';
import { Container } from './styles';
import { TextInputProps } from 'react-native';

export function Input({ ...rest }: TextInputProps) {
  return <Container {...rest} />;
}
