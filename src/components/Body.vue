<template>
  <div class="public_body">
    <!-- <img src="../assets/welcome.gif" /> -->
    <br />
    <br />
    <br />
    <br />
    <br />

    <!-- 游戏图标显示 -->
    <!-- 2048 -->
    <div class="game">
      <a href="../static/2048/index.html">
        <img src="../../static/img/2048.png" class="gameIcon" />
      </a>
    </div>
    <!-- 扫雷 -->
    <div class="game">
      <a href="../static/minesweeper/index.html">
        <img src="../../static/img/minesweeper.png" class="gameIcon" />
      </a>
    </div>
    <!-- 打地鼠 -->
    <div class="game">
      <a href="../static/whac-A-Mole/index.html">
        <img src="../../static/img/whac_a_mole.png" class="gameIcon" />
      </a>
    </div>

    <div></div>
  </div>
</template>

<script>
export default {
  name: "Body",
  data() {
    return {};
  },
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.public_body {
  display: block;
  width: 100%;
  height: 200px;
}
.game {
  width: 33%;
  height: 200px;
  float: left;
}
.gameIcon {
  width: 80px;
  height: 80px;
  cursor: pointer;
}
</style>
