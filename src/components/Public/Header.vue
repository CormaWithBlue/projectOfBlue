<template>
  <div class="public_header">
    <div class="xbgt">
      <img src="../../assets/logo_header.png" height="50px" />
    </div>

    <div class="welcome">
      <img src="../../assets/welcome.gif" height="150px" width="300px" />
    </div>
    <div class="signIn">
      <el-link icon="el-icon-s-custom" class="elLinkSignIn">登录</el-link>
      <a>|</a>
      <el-link icon="el-icon-coordinate" class="elLinkSignIn">注册</el-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "inspiration",
  components: {},
  data() {
    return {};
  },
  created: function() {
    this.$emit("public_header", false);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.public_header {
  display: block;
  width: 100%;
  height: 200px;
}
.xbgt {
  width: 20%;
  height: 100px;
  float: left;
  display: table-cell;
  vertical-align: middle;
}
.welcome {
  width: 60%;
  height: 150px;
  float: left;
  display: table-cell;
  vertical-align: middle;
}
.signIn {
  width: 200px;
  /* height: 150px; */
  float: left;
  font-size: 20px;
  font-weight: bold;
  /* line-height: 30px; */
}
.elLinkSignIn {
  font-size: 20px;
  font-weight: 800;
}
</style>
