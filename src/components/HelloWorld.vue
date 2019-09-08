<template>
  <div>
    <img src="../assets/welcome.gif" />
    <br />
    <div class="hello2048" style="width:660px;height:200px;float:left;">
      <img src="../../static/img/2048.jpg" width="80px" height="80px" />
      <br />
      <a href="../static/2048/index.html">click here to play</a>
      <h2>{{ msg2048 }}</h2>
    </div>
    <div class="helloMineSweeper" style="width:660px;height:200px;float:left;">
      <img src="../../static/img/minesweeper.png" width="80px" height="80px" />
      <br />
      <a href="../static/minesweeper/index.html">click here to play</a>
      <h2>{{ msgMineSweeper }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg2048: "Welcome to the world of 2048!",
      msgMineSweeper: "Come on to play MineSweeper!"
    };
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
</style>
