const fetch = require('node-fetch');

const fractions = 12;
const apiUri = 'https://api.binance.com/api/v3/ticker/price';

const defract = (value) => {
    return value.toFixed(fractions).padEnd(15,0);
}

const getSymbolPrices = async (directSymbol, conversionSymbols) => {
    const response = await fetch(apiUri);
    const data = await response.json();

    const targetSymbols = [...conversionSymbols, directSymbol];

    const currencies = targetSymbols.map(conversionSymbol => {
        const path = conversionSymbol.replace('>', '');
        const currency = {
            symbol: conversionSymbol,
            reverse: false,
            direct: conversionSymbol === directSymbol
        };

        let symbolPrice = data.find(d => d.symbol === path);

        if (symbolPrice) {
            currency.price = parseFloat(symbolPrice.price);
        }
        else {
            const pair = conversionSymbol.split('>');
            const reversePath = `${pair[1]}${pair[0]}`;
            symbolPrice = data.find(d => d.symbol === reversePath)
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
};

const convertToSymbols = async (unit, directSymbol, conversionSymbols) => {
    const { conversions, direct } = await getSymbolPrices(directSymbol, conversionSymbols);

    direct.value = unit * direct.price;
    direct.unit = unit;

    const calculation = [];

    conversionSymbols.map((conversionSymbol, i, holder) => {
        const conversion = conversions.find(c => c.symbol === conversionSymbol);

        if (i === 0) {
            conversion.value = unit * conversion.price;
            conversion.unit = unit;
        }
        else {
            conversion.unit = calculation[i - 1].value;
            conversion.value = conversion.unit * conversion.price;
        }

        calculation.push(conversion);
    });

    return { calculation, direct };
};

const getResultTable = (calculation) => {
    return {
        symbol: calculation.symbol,
        price: defract(calculation.price),
        unit: defract(calculation.unit),
        value: defract(calculation.value),
    };
};

const main = async () => {
    const unit = parseFloat(process.argv[2]);
    const conversionSymbols = process.argv[3].split(',').map(s => s.trim());
    const directSymbol = `${conversionSymbols[0].split('>')[0]}>${conversionSymbols[conversionSymbols.length - 1].split('>')[1]}`;
    const { calculation, direct } = await convertToSymbols(unit, directSymbol, conversionSymbols);

    const chainResult = calculation.map(getResultTable);
    const directResult = getResultTable(direct);

    console.info('**multiple conversions**');
    console.table(chainResult);

    console.info('**direct conversions**');
    console.table([directResult]);

    const chainFinalValue = calculation[calculation.length - 1].value;
    const diff = chainFinalValue - direct.value;
    const diffResult = {
        chainValue: defract(chainFinalValue),
        directValue: defract(direct.value),
        diff: diff.toFixed(fractions).padEnd(15,0),
        profit: diff > 0
    };

    console.info('**diff result**');
    console.table(diffResult);
}

// node index.js 1 "BNB>BTC, BTC>ETH, ETH>LTC, LTC>BTC, BTC>TRY"

main();