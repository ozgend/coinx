<template>
  <footer class="footer">
    <div class="content">
      <a
        class="bd-tw-button button is-link is-small is-pulled-right"
        data-social-network="Github"
        data-social-action="github"
        data-social-target="https://github.com/ozgend/coinx/"
        target="_blank"
        href="https://github.com/ozgend/coinx/"
      >
        <span class="icon has-text-grey">
          <i class="fab fa-github"></i>
        </span>
        <span class="has-text-grey">source</span>
      </a>
      <br />
      <p
        class="is-italic is-size-7 has-text-weight-light has-text-grey has-text-left py-3 px-2"
      >
        fetched from public Binance.com rest api. this page is not affiliated,
        associated, authorized, endorsed by, or in any way officially connected
        with the Binance.com, or any of its subsidiaries or its affiliates.
      </p>
    </div>
  </footer>
</template>

<style scoped>
footer {
  text-shadow: none;
  bottom: 0px;
  margin: 0;
  padding: 0;
  position: absolute;
  background: none;
  width: 100%;
}
a.button {
  font-size: 1rem;
}
</style>

<script>
export default {
  name: 'FooterBar'
};
</script>
