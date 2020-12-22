<template>
  <div class="field">
    <label class="label is-fullwidth has-text-grey-light has-text-left"
      >Check value</label
    >
    <div class="control">
      <button
        v-show="this.value == null"
        class="button is-large is-fullwidth has-text-warning has-background-dark has-text-centered"
        @click="convertClick()"
      >
        CONVERT
      </button>
      <input
        v-show="this.value != null"
        class="input is-fullwidth is-large has-text-info has-background-dark has-text-centered"
        type="text"
        v-bind:value="value"
        readonly
      />
    </div>
  </div>
</template>

<style scoped>
.title {
  font-weight: normal;
}
</style>

<script>
import EventBus from '../event-bus';

export default {
  name: 'ConversionResult',
  data: function () {
    return {
      isConversionRequired: true,
      canProcess: 0,
      value: null
    };
  },
  mounted: function () {
    const _this = this;

    EventBus.$on('on-result-convert', (value) => {
      _this.value = value;
    });
  },
  methods: {
    convertClick() {
      EventBus.$emit('on-begin-convert');
    }
  }
};
</script>
