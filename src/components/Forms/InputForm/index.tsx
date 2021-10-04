/**
 * Created by Pablo Silva
 * Date: 2021/10/04
 * Time: 14:12
 */

import React from 'react';
import { Container } from './styles';
import { TextInputProps } from 'react-native';
import { Control, Controller } from 'react-hook-form';
import { Input } from '../Input';

interface IProps extends TextInputProps {
  control: Control;
  name: string;
}

export function InputForm({ control, name, ...rest }: IProps) {
  return (
    <Container>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input onChangeText={onChange} value={value} {...rest} />
        )}
        name={name}
      />
    </Container>
  );
}
