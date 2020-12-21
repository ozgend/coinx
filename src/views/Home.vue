<template>
  <div class="home">
    <div>
      <progress
        v-show="isBusy"
        class="progress is-small is-primary is-fullwidth"
        max="100"
      >
        15%
      </progress>
      <div v-show="!isBusy" class="progress-spacer"></div>
    </div>

    <div class="container py-6 px-6">
      <div class="container has-text-centered">
        <div class="columns">
          <div class="column">
            <div class="field">
              <label
                class="label is-fullwidth has-text-grey-light has-text-left"
                >Set amount</label
              >
              <div class="control">
                <input
                  class="input is-large is-fullwidth has-text-primary has-background-dark has-text-centered"
                  type="number"
                  v-model="amount"
                  placeholder="AMOUNT"
                  @keyup="isConversionRequired = true"
                />
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label
                class="label is-fullwidth has-text-grey-light has-text-left"
                >Select symbol, ie. LTC>BTC</label
              >
              <div class="control">
                <input
                  class="input is-large is-fullwidth has-text-primary has-background-dark has-text-centered"
                  type="text"
                  placeholder="SYMBOL"
                  v-model="directConversionPair"
                  @focus="directConversionPair = null"
                  @click="
                    isDirectCurrencySelectVisible = !isDirectCurrencySelectVisible
                  "
                  @keyup="filterResults($event.target.value)"
                />
              </div>
            </div>

            <div
              class="field conversion-pair"
              v-show="isDirectCurrencySelectVisible"
            >
              <ul
                class="symbol-selection-list has-text-centered is-fullwidth input"
              >
                <li
                  class="has-text-primary has-background-dark py-1"
                  v-for="pair in filteredSymbolPairs"
                  :key="pair"
                >
                  <span
                    class="is-link is-size-4"
                    @click="setDirectConversionPair(pair)"
                    >{{ pair }}</span
                  >
                </li>
              </ul>
            </div>
          </div>

          <div class="column">
            <div class="field">
              <label
                class="label is-fullwidth has-text-grey-light has-text-left"
                >Check value</label
              >
              <div class="control">
                <button
                  :disabled="isConversionDisabled"
                  v-show="isConversionRequired"
                  class="button is-large is-fullwidth has-text-warning has-background-dark has-text-centered"
                  @click="convertSymbol()"
                >
                  CONVERT
                </button>
                <input
                  v-show="!isConversionRequired"
                  class="input is-fullwidth is-large has-text-info has-background-dark has-text-centered"
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
  text-transform: uppercase;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type='number'] {
  -moz-appearance: textfield;
}
progress,
.progress-spacer {
  border-radius: 0 !important;
  height: 0.25rem !important;
  margin: 0 !important;
  padding: 0 !important;
}

.conversion-pair {
  position: relative;
}

.symbol-selection-list {
  position: absolute;
  z-index: 999;
  height: 20rem;
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
import SymbolService from '../services/symbol-service';
const _symbolService = new SymbolService();

export default {
  name: 'Home',
  data: function () {
    return {
      isBusy: false,
      amount: null,
      symbolPairs: [],
      filteredSymbolPairs: [],
      selectedPairs: [],
      directConversionPair: null,
      isDirectCurrencySelectVisible: false,
      isConversionRequired: true,
      conversionResult: { direct: { price: 0 }, conversions: [] }
    };
  },
  computed: {
    isConversionDisabled: function () {
      return !this.amount || !this.directConversionPair;
    }
  },
  mounted: function () {
    this.loadSymbolPairs();
  },
  methods: {
    setBusy(busy) {
      this.isBusy = busy;
    },

    async loadSymbolPairs() {
      this.setBusy(true);
      if (!localStorage.symbolPairs) {
        console.log('-- request data');
        localStorage.symbolPairs = JSON.stringify(
          await _symbolService.getSymbolPairs()
        );
      }
      this.symbolPairs = JSON.parse(localStorage.symbolPairs);
      this.filteredSymbolPairs = this.symbolPairs;
      this.setBusy(false);
    },

    setDirectConversionPair(pair) {
      this.directConversionPair = pair;
      this.isDirectCurrencySelectVisible = false;
      this.isConversionRequired = true;
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
        !this.isConversionRequired ||
        !this.directConversionPair ||
        this.amount === 0
      ) {
        return;
      }
      this.setBusy(true);
      this.conversionResult = await _symbolService.convertToSymbols(
        this.amount,
        this.directConversionPair
      );
      this.isConversionRequired = false;
      this.setBusy(false);
    }
  }
};
</script>
