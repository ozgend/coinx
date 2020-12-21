<template>
  <footer class="footer">
    <div class="content has-text-centered">
      <a
        class="bd-tw-button button is-link is-small"
        data-social-network="Github"
        data-social-action="github"
        data-social-target="https://github.com/ozgend/coinx/"
        target="_blank"
        href="https://github.com/ozgend/coinx/"
      >
        <span class="icon">
          <i class="fab fa-github"></i>
        </span>
        <span>Github</span>
      </a>
    </div>
  </footer>
</template>

<style scoped>
footer {
  bottom: 0px;
  margin: 0;
  padding: 0;
  position: absolute;
  background: none;
}
a.button{
  font-size: 1.0rem;
}
</style>

<script>
export default {
  name: 'FooterBar'
};
</script>
