/**
 * Created by Pablo Silva
 * Date: 2022/02/07
 * Time: 23:45
 */

declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}
