<template>
  <div class="public_body">
    <!-- <img src="../assets/welcome.gif" /> -->
    <br />
    <div class="game">
      <a href="../static/2048/index.html">
        <img src="../../static/img/2048.png" width="80px" height="80px" style="cursor: pointer;" />
      </a>
    </div>
    <div class="game">
      <a href="../static/minesweeper/index.html">
        <img
          src="../../static/img/minesweeper.png"
          width="80px"
          height="80px"
          style="cursor: pointer;"
        />
      </a>
    </div>
    <div class="game">
      <a href="../static/whac-A-Mole/index.html">
        <img
          src="../../static/img/whac_a_mole.png"
          width="80px"
          height="80px"
          style="cursor: pointer;"
        />
      </a>
      <!-- <h2>{{ msgWhacAMole }}</h2> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "Body",
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: rgb(0, 122, 204);
}
.public_body {
  display: block;
  width: 100%;
  height: 300px;
}
.game {
  width: 33%;
  height: 200px;
  float: left;
}
</style>
