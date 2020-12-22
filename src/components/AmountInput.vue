<template>
  <div class="field">
    <label class="label is-fullwidth has-text-grey-light has-text-left"
      >Set amount</label
    >
    <div class="control">
      <input
        class="input is-large is-fullwidth has-text-primary has-background-dark has-text-centered"
        type="number"
        v-bind:value="amount"
        v-on:input="inputChanged($event.target.value)"
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
  props: ['amount'],
  methods: {
    inputChanged(value) {
      EventBus.$emit('on-amount-input', value);
    }
  }
};
</script>
