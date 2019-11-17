<template>
  <div class="public_header">
    <div class="header_top">
      <div class="xbgt">
        <img src="../../assets/logo_header.png" height="50px" />
      </div>
      <div class="signIn">
        <el-link icon="el-icon-s-custom" class="elLinkSignIn">登录</el-link>
        <a>|</a>
        <el-link icon="el-icon-coordinate" class="elLinkSignIn">注册</el-link>
      </div>
    </div>

    <div class="header_buttom">
      <div class="welcome">
        <img src="../../assets/welcome.gif" height="100px" width="400px" />
      </div>
      <!-- <div class="navMenu_header">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item index="1">首页</el-menu-item>
          <el-submenu index="2">
            <template slot="title">玩游戏</template>
            <el-menu-item index="2-1">2048</el-menu-item>
            <el-menu-item index="2-2">扫雷</el-menu-item>
            <el-menu-item index="2-3">打地鼠</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">照片墙</template>
            <el-menu-item index="3-1">上传照片</el-menu-item>
            <el-menu-item index="3-2">删除照片</el-menu-item>
            <el-menu-item index="3-3">排列照片</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "inspiration",
  components: {},
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1"
    };
  },
  created: function() {
    this.$emit("public_header", false);
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.public_header {
  display: block;
  width: 100%;
  height: 170px;
}
.header_top {
  background-color: rgb(243, 243, 243);
  /* width: 100%; */
  height: 50px;
}
.header_buttom {
  width: 100%;
  height: 120px;
  display: block;
  /* vertical-align: middle; */
  /* text-align: center; */
  /* text-align: center; */
  /* background-color: rgb(240, 243, 244); */
}
.xbgt {
  width: 20%;
  height: 50px;
  float: left;
  display: table-cell;
  vertical-align: middle;
}
.welcome {
  width: 25%;
  height: 120px;
  /* float: left; */
  /* display: block; */
  /* vertical-align: middle; */
  /* text-align: center; */
  display: table-cell;
  vertical-align: middle;
}
/* .navMenu_header {
  width: 60%;
  height: 120px;
  float: right;
  display: table-cell;
  vertical-align: buttom;
} */

/* .el-menu-demo {
  width: 60%;
  height: 120px;
  display: table-cell;
  vertical-align: bottom;
  background-color: rgb(240, 243, 244);
} */
.signIn {
  width: 200px;
  /* height: 150px; */
  float: right;
  font-size: 20px;
  font-weight: bold;
  height: 50px;
  /* line-height: 30px; */
}
.elLinkSignIn {
  font-size: 20px;
  font-weight: 800;
  height: 50px;
}
</style>
