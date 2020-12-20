# coinx
calculate profit via coin conversion 

## todo
- include commission rates
- find profit for conversion paths

## run
```bash
npm run coinx 1 "BNB>LTC, LTC>ETH, ETH>BTC"
```

## sample output
---

**multiple conversions with given path**

│ path  │  symbol   │ price                 │      unit             │     value             │
| ----- | --------- | --------------------- | --------------------- | --------------------- | 
│ 0     │ 'BNB>LTC' │ 0.304414003044        │ 1                     │ 0.304414003044        │
│ 1     │ 'LTC>ETH' │ 0.17799               │ 0.304414003044        │ 0.054182648402        │
│ 2     │ 'ETH>BTC' │ 0.027528              │ 0.054182648402        │ 0.001491539945        │


**direct conversion**
│ path  │  symbol   │ price                 │      unit             │     value             │
| ----- | --------- | --------------------- | --------------------- | --------------------- | 
│ 0     │ 'BNB>BTC' │ 0.0014895             │  1                    │ 0.0014895             │


**diff result**
│             │     value        │
| ----------- | ---------------- | 
│ chainValue  │ 0.001491539945   │
│ directValue │ 0.0014895        │
│    diff     │ 0.000002039945   │
│   profit    │ true             │
└─────────────┴──────────────────┘