<template>
  <div id="app">
    <nav-bar></nav-bar>
    <router-view />
    <footer-bar></footer-bar>
  </div>
</template>

<style>
html {
  overflow: hidden;
  overflow-x: hidden;
}

html,
body,
div#app {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

body {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #424242;
  text-shadow: 0px 0px 6px #2d2d2d;
}

h1,
h2,
h3,
div,
p,
a,
body {
  color: #efefef !important;
}

a,
a:hover {
  background: none !important;
  border-bottom: 2px solid transparent !important;
}

a:hover {
  border-bottom: 2px solid #efefef !important;
}
</style>

<script>
// @ is an alias to /src
import NavBar from './components/NavBar';
import FooterBar from './components/FooterBar';

export default {
  components: {
    NavBar,
    FooterBar
  }
};
</script>
