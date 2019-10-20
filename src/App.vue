<template>
  <div id="app">
    <el-backtop class="backUp"></el-backtop>
    <app-header v-if="header_show"></app-header>
    <router-view></router-view>
    <app-photoWall v-if="photoWall_show"></app-photoWall>
  </div>
</template>

<script>
import Header from "./components/Public/Header";
import Body from "./components/Body";
import PhotoWall from "./components/PhotoWall";
// import Footer from "./components/Public/Footer";

export default {
  name: "App",
  data() {
    return {
      header_show: true,
      // body_show: true
      // footer_show: true
      photoWall_show: true
    };
  },
  components: {
    "app-header": Header,
    "app-body": Body,
    "app-photoWall": PhotoWall
    // "app-footer": Footer
  },
  methods: {
    //是否显示头部
    public_header: function(bool) {
      this.header_show = bool;
    }
    //是否显示身体
    // public_body: function(bool) {
    //   this.body_show = bool;
    // }
    //是否显示底部
    // public_footer: function(bool) {
    //   this.footer_show = bool;
    // }
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
  background-image: url(./assets/background_public.jpg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 1000px;
}
.backUp {
  /* height: 15px; */
  /* width: 15px; */
  background-image: url(../static/backUp_tou.png);
  background-size: 40px 40px;
  background-repeat: no-repeat;
  /* box-shadow: 0 0 6px rgba(0, 0, 0, 0.12); */
  /* text-align: center; */
  /* line-height: 10px;
  color: #1989fa; */
}
</style>
