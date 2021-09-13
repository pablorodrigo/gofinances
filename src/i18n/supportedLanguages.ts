/**
 * Created by Pablo Silva
 * Date: 2021/09/13
 * Time: 17:23
 */

import i18n from 'i18n-js';
import { capitalize } from '../util/strings';

const en_us = {
  welcome: 'welcome',
  hello: 'hello',
  balance: 'balance',
  total: 'total',
  debits: 'debits',
  transfers: 'transfers',
};

const pt_br = {
  welcome: 'bem vindo',
  hello: 'olá',
  balance: 'saldo',
  total: 'total',
  debits: 'saidas',
  transfers: 'entradas',
};

export default function getTranslation(key: string) {
  return capitalize(i18n.t(key));
}

export { en_us, pt_br };
