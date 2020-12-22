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
            <amount-input></amount-input>
          </div>
          <div class="column">
            <symbol-select></symbol-select>
          </div>
          <div class="column">
            <conversion-result></conversion-result>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
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

</style>

<script>
import EventBus from '../event-bus';
import AmountInput from '../components/AmountInput';
import ConversionResult from '../components/ConversionResult';
import SymbolSelect from '../components/SymbolSelect';

export default {
  components: { AmountInput, ConversionResult, SymbolSelect },
  name: 'Home',
  data: function () {
    return {
      isBusy: false
    };
  },
  mounted: function () {
    const _this = this;

    EventBus.$on('on-update-busy', (busy) => {
      _this.isBusy = busy;
    });
  }
};
</script>
