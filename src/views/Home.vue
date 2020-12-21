<template>
  <div class="home">
    <div class="container py-6 px-6">
      <div class="container has-text-centered">
        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label is-fullwidth has-text-primary has-text-left"
                >Set amount</label
              >
              <div class="control">
                <input
                  class="input is-large is-fullwidth has-text-primary has-background-dark has-text-centered"
                  type="number"
                  v-model="amount"
                  placeholder="AMOUNT"
                  @keyup="requireConversion = true"
                />
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label class="label is-fullwidth has-text-primary has-text-left"
                >Select symbol pair</label
              >
              <div class="control">
                <input
                  class="input is-large is-fullwidth has-text-primary has-background-dark has-text-centered"
                  type="text"
                  placeholder="SYMBOL"
                  v-model="directConversionPair"
                  @click="
                    isDirectCurrencySelectVisible = !isDirectCurrencySelectVisible
                  "
                  @keyup="filterResults($event.target.value)"
                />
              </div>
            </div>

            <div class="select is-large" v-show="isDirectCurrencySelectVisible">
              <select
                multiple
                @change="setDirectConversionPair($event.target.value)"
                size="6"
                class="has-text-primary has-background-dark has-text-centered"
              >
                <option v-for="pair in filteredSymbolPairs" :key="pair">
                  {{ pair }}
                </option>
              </select>
            </div>
          </div>

          <div class="column">
            <div class="field">
              <label class="label is-fullwidth has-text-primary has-text-left"
                >!</label
              >
              <div class="control">
                <button
                  v-show="requireConversion"
                  class="button is-large is-fullwidth has-text-primary has-background-dark has-text-centered"
                  @click="convertSymbol()"
                  readonly
                >
                  CONVERT
                </button>
                <input
                  v-show="!requireConversion"
                  class="input is-fullwidth is-large has-text-primary has-background-dark has-text-centered"
                  type="text"
                  v-model="conversionResult.direct.price"
                  readonly
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
::placeholder {
  color: #00d1b2 !important;
}
input,
button {
  outline: none !important;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type='number'] {
  -moz-appearance: textfield;
}
</style>

<script>
import SymbolService from '../services/symbol-service';
const _symbolService = new SymbolService();

export default {
  name: 'Home',
  data: function () {
    return {
      amount: 0,
      symbolPairs: [],
      filteredSymbolPairs: [],
      selectedPairs: [],
      directConversionPair: null,
      isDirectCurrencySelectVisible: false,
      requireConversion: true,
      conversionResult: { direct: { price: 0 }, conversions: [] }
    };
  },
  mounted: function () {
    this.loadSymbolPairs();
  },
  methods: {
    async loadSymbolPairs() {
      if (!localStorage.symbolPairs) {
        console.log('-- request data');
        localStorage.symbolPairs = JSON.stringify(
          await _symbolService.getSymbolPairs()
        );
      }
      this.symbolPairs = JSON.parse(localStorage.symbolPairs);
      this.filteredSymbolPairs = this.symbolPairs;
    },

    setDirectConversionPair(pair) {
      this.directConversionPair = pair;
      this.isDirectCurrencySelectVisible = false;
      this.requireConversion = true;
    },

    toggleSymbolPair(pair, willRemove) {
      if (willRemove) {
        this.selectedPairs.splice(this.selectedPairs.indexOf(pair), 1);
        return;
      }
      if (this.selectedPairs.indexOf(pair) < 0) {
        this.selectedPairs.push(pair);
      }
    },

    filterResults(value) {
      if (value && value.length > 0) {
        this.filteredSymbolPairs = this.symbolPairs.filter(
          (p) => p.toLowerCase().indexOf(value.toLowerCase()) > -1
        );
      }
    },

    async convertSymbol() {
      if (
        !this.requireConversion ||
        !this.directConversionPair ||
        this.amount === 0
      ) {
        return;
      }
      this.conversionResult = await _symbolService.convertToSymbols(
        this.amount,
        this.directConversionPair
      );
      this.requireConversion = false;
    }
  }
};
</script>
