# coinx
calculate profit via difcoin conversion vs. direct conversion

## todo
- include commission rates
- find profit for conversion paths

## run
```
npm run coinx [unit] [coin conversion]
```

```bash
npm run coinx 1 "BNB>LTC, LTC>ETH, ETH>BTC"
```

## sample output


**multiple conversions with given path**

| path  |  symbol   | price                 |      unit             |     value             |
| ----- | :-------- | --------------------: | --------------------: | --------------------: | 
| 0     | 'BNB>LTC' | 0.304414003044        | 1.000000000000        | 0.304414003044        |
| 1     | 'LTC>ETH' | 0.177990000000        | 0.304414003044        | 0.054182648402        |
| 2     | 'ETH>BTC' | 0.027528000000        | 0.054182648402        | 0.001491539945        |


**direct conversion**

| path  |  symbol   | price                 |      unit             |     value             |
| ----- | --------- | --------------------: | --------------------: | --------------------: | 
| 0     | 'BNB>BTC' | 0.001489500000        |  1                    | 0.001489500000        |


**diff result**

|             |     value        |
| ----------- | ---------------: | 
| chainValue  | 0.001491539945   |
| directValue | 0.001489500000   |
|    diff     | 0.000002039945   |
|   profit    | true             |