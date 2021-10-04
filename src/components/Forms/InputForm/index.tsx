/**
 * Created by Pablo Silva
 * Date: 2021/10/04
 * Time: 14:12
 */

import React from 'react';
import { Container, Error } from './styles';
import { TextInputProps } from 'react-native';
import { Control, Controller } from 'react-hook-form';
import { Input } from '../Input';
import { IFormDataProps } from '../../../screens/Register';

interface IProps extends TextInputProps {
  control: Control<IFormDataProps>;
  name: string | undefined;
  error: string | undefined;
}

export function InputForm({ control, name, error, ...rest }: IProps) {
  return (
    <Container>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input onChangeText={onChange} value={value as string} {...rest} />
        )}
        name={name}
      />
      {error && <Error>{error}</Error>}
    </Container>
  );
}
