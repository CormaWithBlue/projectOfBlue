<template>
  <div class="public_header">
    <img src="../../assets/logo_header.png" align="left" />
    <h3>header</h3>
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
h1,
h2,
h3 {
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
