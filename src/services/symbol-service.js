/* eslint-disable space-before-function-paren */
import axios from 'axios';
const apiUri = 'https://api.binance.com/api/v3';

export default class SymbolService {
  async convertToSymbols(amount, directSymbol, conversionSymbols) {
    conversionSymbols = conversionSymbols || [];
    const { conversions, direct } = await this._getSymbolPrices(directSymbol, conversionSymbols);

    direct.value = amount * direct.price;
    direct.unit = amount;

    const calculation = [];

    conversionSymbols.map((conversionSymbol, i, holder) => {
      const conversion = conversions.find(c => c.symbol === conversionSymbol);

      if (i === 0) {
        conversion.value = amount * conversion.price;
        conversion.unit = amount;
      }
      else {
        conversion.unit = calculation[i - 1].value;
        conversion.value = conversion.unit * conversion.price;
      }

      calculation.push(conversion);
    });

    return { calculation, direct };
  }

  async getSymbolPairs() {
    const response = await axios.get(`${apiUri}/exchangeInfo`);
    const pairs = new Set();

    response.data.symbols.map(s => {
      pairs.add(`${s.baseAsset}>${s.quoteAsset}`);
      pairs.add(`${s.quoteAsset}>${s.baseAsset}`);
    });

    return [...pairs];
  }

  async _getSymbolPrices(directSymbol, conversionSymbols) {
    const response = await axios.get(`${apiUri}/ticker/price`);
    const targetSymbols = [...conversionSymbols || [], directSymbol];

    const currencies = targetSymbols.map(targetSymbol => {
      const path = targetSymbol.replace('>', '');
      const currency = {
        symbol: targetSymbol,
        reverse: false,
        direct: targetSymbol === directSymbol
      };

      let symbolPrice = response.data.find(d => d.symbol === path);

      if (symbolPrice) {
        currency.price = parseFloat(symbolPrice.price);
      }
      else {
        const pair = targetSymbol.split('>');
        const reversePath = `${pair[1]}${pair[0]}`;
        symbolPrice = response.data.find(d => d.symbol === reversePath);
        currency.price = 1 / parseFloat(symbolPrice.price);
        currency.reverse = true;
      }

      return currency;
    });

    const direct = currencies.find(c => c.direct);

    return {
      direct,
      conversions: currencies.filter(c => !c.direct)
    };
  }
};
