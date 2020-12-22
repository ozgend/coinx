<template>
  <div>
    <div class="field">
      <label class="label is-fullwidth has-text-grey-light has-text-left"
        >Select symbol, ie. LTC>BTC</label
      >
      <div class="control">
        <input
          class="input is-large is-fullwidth has-text-primary has-background-dark has-text-centered"
          type="text"
          placeholder="SYMBOL"
          v-model="inputSymbol"
          @click="toggleDisplayCurrencyList()"
          @keyup="filterSymbols($event.target.value)"
        />
      </div>
    </div>

    <div class="field conversion-pair" v-show="isCurrencyListVisible">
      <ul class="symbol-selection-list has-text-centered is-fullwidth input">
        <li
          class="has-text-primary has-background-dark py-1"
          v-for="symbol in filteredSymbols"
          :key="symbol"
        >
          <span class="is-link is-size-4" @click="onSelectSymbol(symbol)">{{
            symbol
          }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.title {
  font-weight: normal;
}
.conversion-pair {
  position: relative;
}
.symbol-selection-list {
  position: absolute;
  z-index: 999;
  max-height: 20rem;
  height: auto;
  overflow: hidden;
  overflow-y: scroll;
  width: 100%;
  padding: 0;
}
.symbol-selection-list > li {
  cursor: pointer;
}
.symbol-selection-list > li:hover {
  background-color: #2f2f2f !important;
}
</style>

<script>
import EventBus from '../event-bus';

export default {
  name: 'SymbolSelect',
  data: function () {
    return {
      symbols: [],
      filteredSymbols: [],
      inputSymbol: null,
      isCurrencyListVisible: false
    };
  },
  mounted() {
    const _this = this;

    EventBus.$on('on-complete-loading-symbols', (symbols) => {
      _this.symbols = symbols;
      _this.filteredSymbols = symbols;
    });

    EventBus.$emit('on-begin-loading-symbols');
  },
  methods: {
    filterSymbols(value) {
      if (this.inputSymbol && this.inputSymbol.length > 1) {
        this.filteredSymbols = this.symbols.filter(
          (p) => p.toLowerCase().indexOf(this.inputSymbol.toLowerCase()) > -1
        );
        // eslint-disable-next-line brace-style
      } else {
        this.filteredSymbols = this.symbols;
      }
    },
    toggleDisplayCurrencyList() {
      if (!this.isCurrencyListVisible) {
        this.inputSymbol = null;
        EventBus.$emit('on-cancel-convert');
        EventBus.$emit('on-clear-symbol');
      }
      this.isCurrencyListVisible = !this.isCurrencyListVisible;
    },
    onSelectSymbol(symbol) {
      this.inputSymbol = symbol;
      this.isCurrencyListVisible = false;
      EventBus.$emit('on-select-symbol', symbol);
      EventBus.$emit('on-begin-convert');
    }
  }
};
</script>
