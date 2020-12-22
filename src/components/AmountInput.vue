<template>
  <div class="field">
    <label class="label is-fullwidth has-text-grey-light has-text-left"
      >Set amount</label
    >
    <div class="control">
      <input
        class="input is-large is-fullwidth has-text-primary has-background-dark has-text-centered"
        type="number"
        v-bind:value="getAmount()"
        v-on:input="onInput($event.target)"
        placeholder="AMOUNT"
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
  name: 'AmountInput',
  data: function () {
    return {};
  },

  mounted: function () {},
  methods: {
    getAmount() {
      return EventBus.getModel().amount;
    },
    onInput(input) {
      if (input.value.length === 0 || input.value === '0') {
        EventBus.$emit('on-cancel-convert');
        return;
      }
      EventBus.$emit('on-input-amount', input.value);
      EventBus.$emit('on-begin-convert');
    }
  }
};
</script>
