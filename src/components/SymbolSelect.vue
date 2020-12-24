<template>
  <div>
    <div class="field">
      <label class="label is-fullwidth has-text-grey-light has-text-left"
        >Select symbol, ie. LTC>BTC</label
      >

      <div
        class="field has-addons is-fullwidth border-fix"
        type="text"
        v-for="(symbol, index) in selectedSymbols"
        :key="symbol"
      >
        <div class="control is-expanded">
          <input
            class="input is-large is-fullwidth is-expanded has-text-primary has-background-dark has-text-centered"
            type="text"
            :value="symbol"
            readonly
          />
        </div>
        <div class="control">
          <span
            class="button is-large is-fullwidth has-text-warning has-background-dark has-text-centered"
            v-show="index === selectedSymbols.length - 1"
            @click="toggleDisplayCurrencyList()"
          >
            <i class="fas fa-plus"></i>
          </span>
        </div>

        <div class="control">
          <span
            class="button is-large is-fullwidth has-text-danger has-background-dark has-text-centered"
            @click="removeSymbolFromSelection(symbol)"
          >
            <i class="fas fa-minus"></i>
          </span>
        </div>
      </div>

      <!-- <div class="control">
        <input
          class="input is-large is-fullwidth has-text-primary has-background-dark has-text-centered selected-symbol-list-item my-2"
          type="text"
          v-for="symbol in selectedSymbols"
          :key="symbol"
          :value="symbol"
          readonly
        />
      </div> -->

      <div
        class="control"
        v-show="isCurrencyListVisible || selectedSymbols.length == 0"
      >
        <input
          class="input is-large is-fullwidth has-text-primary has-background-dark has-text-centered"
          type="text"
          ref="filterSymbolInput"
          placeholder="SEARCH SYMBOL"
          @click="onFilterInputClick()"
          v-model="symbolFilter"
          @keyup="filterSymbols()"
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
      selectedSymbols: [],
      symbolFilter: null,
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
    filterSymbols() {
      if (this.symbolFilter && this.symbolFilter.length > 1) {
        this.filteredSymbols = this.symbols.filter(
          (p) => p.toLowerCase().indexOf(this.symbolFilter.toLowerCase()) > -1
        );
        // eslint-disable-next-line brace-style
      } else {
        this.filteredSymbols = this.symbols;
      }
    },
    onFilterInputClick() {
      if (this.selectedSymbols.length > 0) {
        return;
      }
      this.toggleDisplayCurrencyList();
    },
    toggleDisplayCurrencyList() {
      this.isCurrencyListVisible = !this.isCurrencyListVisible;
      if (this.isCurrencyListVisible) {
        this.$refs.filterSymbolInput.focus();
        if (this.selectedSymbols.length > 0) {
          this.symbolFilter = `${
            this.selectedSymbols[this.selectedSymbols.length - 1].split('>')[1]
          }>`;
          this.filterSymbols();
        }
      }
    },
    onSelectSymbol(symbol) {
      this.isCurrencyListVisible = false;
      this.addSymbolToSelection(symbol);
      EventBus.$emit('on-begin-convert');
    },
    addSymbolToSelection(symbol) {
      if (this.selectedSymbols.indexOf(symbol) > -1) {
        return;
      }
      this.selectedSymbols.push(symbol);
      EventBus.$emit('on-update-symbol-selection', this.selectedSymbols);
    },
    removeSymbolFromSelection(symbol) {
      if (this.selectedSymbols.indexOf(symbol) < -1) {
        return;
      }
      this.selectedSymbols = this.selectedSymbols.filter((s) => s !== symbol);
      EventBus.$emit('on-update-symbol-selection', this.selectedSymbols);
    }
  }
};
</script>
