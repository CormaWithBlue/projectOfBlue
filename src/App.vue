<template>
  <div id="app">
    <app-header v-if="header_show"></app-header>
    <br />
    <router-view v-on:public_header="public_header" v-on:public_footer="public_footer"></router-view>
    <br />
    <app-footer v-if="footer_show"></app-footer>
  </div>
</template>

<script>
import Header from "./components/Public/Header";
import Footer from "./components/Public/Footer";

export default {
  name: "App",
  data() {
    return {
      header_show: true,
      footer_show: true
    };
  },
  components: {
    "app-header": Header,
    "app-footer": Footer
  },
  methods: {
    //是否显示头部
    public_header: function(bool) {
      this.header_show = bool;
    },
    //是否显示底部
    public_footer: function(bool) {
      this.footer_show = bool;
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 5px;
  background-image: url(./assets/background_public.png);
}
</style>
