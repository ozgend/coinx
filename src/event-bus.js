import Vue from 'vue';
import SymbolService from './services/symbol-service';
const _symbolService = new SymbolService();

export default new Vue({
  data: function () {
    return {
      model: {
        amount: null,
        selectedSymbols: []
      }
    };
  },
  created() {
    const _this = this;

    this.$on('on-input-amount', (value) => {
      _this.model.amount = value;
    });

    this.$on('on-update-symbol-selection', (symbols) => {
      _this.model.selectedSymbols = symbols;
    });

    this.$on('on-clear-symbol', (symbol) => {
      console.log('removed all from selectedSymbols');
    });

    this.$on('on-begin-convert', async () => {
      if (!_this.model.amount || _this.model.selectedSymbols.length === 0) {
        _this.$emit('on-cancel-convert');
        return;
      }
      console.log('on-begin-convert');
      console.log(_this.model);
      _this.convertSymbol();
    });

    this.$on('on-cancel-convert', () => {
      _this.$emit('on-result-convert', null);
    });

    this.$on('on-begin-loading-symbols', (symbols) => {
      console.log('on-begin-loading-symbols');
      _this.loadSymbols();
    });
  },
  methods: {
    getModel() {
      return this.model;
    },
    getUiState() {
      return this.uiState;
    },
    async loadSymbols() {
      this.$emit('on-update-busy', true);
      let symbols;
      if (!localStorage.symbolPairs) {
        console.log('-- request data');
        symbols = await _symbolService.getSymbolPairs();
        localStorage.symbolPairs = JSON.stringify(symbols);
      }
      symbols = JSON.parse(localStorage.symbolPairs);
      this.$emit('on-complete-loading-symbols', symbols);
      this.$emit('on-update-busy', false);
    },
    async convertSymbol() {
      this.$emit('on-update-busy', true);

      const directConversionPair = `${this.model.selectedSymbols[0].split('>')[0]}>${this.model.selectedSymbols[this.model.selectedSymbols.length - 1].split('>')[1]}`;

      const result = await _symbolService.convertToSymbols(
        this.model.amount,
        directConversionPair,
        this.model.selectedSymbols.length === 1 ? [] : this.model.selectedSymbols
      );

      this.$emit('on-update-busy', false);
      this.$emit('on-result-convert', result.direct.value);

      if (window.__fba__ && window.__fba__.logEvent) {
        window.__fba__.logEvent('search', {
          search_term: this.directConversionPair
        });
      }
    }
  }
});
